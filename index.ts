const express = require('express')
const app = express()
const port = 3000

app.get('/tp_node_ts_rk', (req, res) => {
    const download = require('download');
    const fs = require('fs')
    const csv = require('csv-parser')
    const results = [];
    const unzip = require('unzip-stream')

   download('https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip', 'data').then(() => {
        fs.createReadStream('data/Data.zip')
        .pipe(unzip.Parse())
        .on('entry', function (entry) {
            const file = entry.path;
            const type = entry.type;
            const size = entry.size;
            if (file === "StockEtablissementLiensSuccession_utf8.csv") {
                entry.pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    const convey = results.filter(result => result.convey == 'true')
                    const pourcentage = convey.length / results.length * 100
                    let resultat = pourcentage.toFixed(1)
                    res.send(`A peu près ${pourcentage.toFixed(2)}% des entreprises ont déplacés leur sièges depuis le 1er Novembre 2022`)
                } )
            } else {
                entry.autodrain();
            }
        });
})
})

app.listen(port, () => console.log(`Example app listening on port ${port}
