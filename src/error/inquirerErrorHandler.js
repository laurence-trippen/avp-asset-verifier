export const promptErrorHandler = (error) => {
  if (error.isTtyError) {
    console.error("Prompt couldn't be rendered in the current environment");
  } else {
    console.error("Something else went wrong");
  }
};
