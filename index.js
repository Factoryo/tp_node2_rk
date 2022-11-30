const express = require('express')
const app = express()
const port = 3000

app.get('/tp_node_rodolphe_katz', (rep, res)=>{
    const fs = require('fs')
    const csv = require('csv-parser')
    const resultat = [];
    const download = require('download');
    const unzip = require('unzip-stream')
    var i = 0;
    var countTrue = 0;

    download('https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip', 'data').then(() => {
        fs.createReadStream('data/StockEtablissementLiensSuccession_utf8.zip')
        .pipe(unzip.Parse())
        .on('entry', function (entry) {
            const fileName = entry.path;
            const type = entry.type;
            const size = entry.size;
            if (fileName === "StockEtablissementLiensSuccession_utf8.csv") {
                entry.pipe(csv()) 
    .on('data', (data) => if(element.transfertSiege == 'true'){
        countTrue++;
    }
    i++;
    
    .on('end', () => {
    resultat.forEach(element => {
        
    });
    let pourcentage = countTrue/i*100;
    res.send(`A peu près ${pourcentage.toFixed(2)}% des entreprises ont déplacés leur sièges depuis le 3 juin 2020`)
  })
            } else {
                entry.autodrain();
            }
        });
    })
        })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))