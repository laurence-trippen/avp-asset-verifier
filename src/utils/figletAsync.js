import figlet from "figlet";

const figletAsync = (text) => {
  return new Promise((resolve, reject) => {
    figlet(text, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

export default figletAsync;
