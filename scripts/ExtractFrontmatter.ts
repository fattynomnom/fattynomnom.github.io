const fs = require('fs')
const fm = require('front-matter')

const convertToSlug = text => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

const allAttrs = fs
    .readdirSync('./src/docs')
    .map(file => {
        if (!file.includes('.md')) {
            return undefined
        }

        const data = fs.readFileSync(`./src/docs/${file}`, { encoding: 'utf8' })
        const { attributes } = fm(data)

        return {
            ...attributes,
            fileName: file,
            slug: convertToSlug(attributes.title)
        }
    })
    .filter(attr => !!attr)
    .sort((a, b) => {
        const [aDay, aMonth, aYear] = a.date.split('/')
        const [bDay, bMonth, bYear] = b.date.split('/')

        return new Date(bYear, bMonth, bDay).getTime() - new Date(aYear, aMonth, aDay).getTime()
    })

fs.writeFileSync('./src/docs/generated.json', JSON.stringify(allAttrs))
