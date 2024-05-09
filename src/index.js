export default function (babel) {
  console.log(babel);
  return {
    visitor: {
      Identifier() {
        console.log("Called!");
      }
    }
  };
}