const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.di8eg8z.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("ERROR:", err);
      return;
    }

    console.log("SRV encontrados:");
    console.log(addresses);
  }
);