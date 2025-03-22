
import { writeFile } from 'fs/promises';
import { loadWeb } from '.';


const test = async () => {

    const response = await loadWeb({
        search: {
            bing: { url: 'https://bing.com' },
            google: { url: 'https://google.com' },
        },
        icons: {
            github: { url: 'https://github.com' },
            nestedIcons: {
                facebook: { url: 'https://facebook.com' },
            }
        },
        github: { url: 'https://github.com' },

    }, {
        dist: './Data',
        html: true,
    })


    await writeFile('./responses.json', JSON.stringify(response, null, 2))
    console.log(response)

}

test()
