const express = require('express');
const Query = require("best-samp-query");
const fs = require("fs");

const app = express();

// 🔥 Libera o JSON na web
app.use(express.static(__dirname));

const SERVER_IP = "191.96.224.79";
const SERVER_PORT = 7897;

// Função que atualiza o JSON
async function atualizarServidor() {
  try {
    const data = await Query({
      host: SERVER_IP,
      port: SERVER_PORT,
      timeout: 5000
    });

    const jsonData = {
      consulta: [
        {
          numero: 1,
          nome: data.hostname,
          ip: data.address,
          porto: data.port,
          online: data.online,
          maxplayers: data.maxplayers,
          senha: data.passworded || false
        }
      ]
    };

    fs.writeFileSync("servidores.json", JSON.stringify(jsonData, null, 2));

    console.log("JSON atualizado 🔥");

  } catch (err) {

    const offlineData = {
      consulta: [
        {
          numero: 1,
          nome: "Gold City Roleplay",
          ip: SERVER_IP,
          porto: SERVER_PORT,
          online: 0,
          maxplayers: 0,
          senha: false
        }
      ]
    };

    fs.writeFileSync("servidores.json", JSON.stringify(offlineData, null, 2));

    console.log("Servidor offline ❌");
  }
}

// Atualiza a cada 30 segundos
setInterval(atualizarServidor, 30000);

// Atualiza quando inicia
atualizarServidor();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT} 🔥`);
});