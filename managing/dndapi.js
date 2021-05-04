const fetch = require("node-fetch");

async function getDndInfo(msg) {

    let newMsg = msg.content.split(' ')
    let categorie = newMsg[1];
    let item = newMsg[2];

    const response = await fetch(`https://www.dnd5eapi.co/api/${categorie}/${item}`)
        .then(res => res.json())
        .then(result => {
            console.log(result)
            return result;
        })
        .catch(err => {
            if (err) {
                return err;
            }
        });
    if (response.error) {
        msg.channel.send('tu pesquisou errado, meu amigo, tente outra vez')
    }
    else {
        const message = `   Classe: ${response.name}
Dado de vida: ${response.hit_die}
Proficiencias:${response.proficiencies.map(element => {
            return ` ${element.name}`;
        })}
Teste de resistencia:${response.saving_throws.map(element => {
            return ` ${element.name}`;
        })}
        `
        msg.channel.send(message);

    }

}

module.exports = getDndInfo;


