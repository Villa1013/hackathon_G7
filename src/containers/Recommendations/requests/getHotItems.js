/* eslint-disable import/prefer-default-export */
// https://catalogue.chiper.co/store/127598/available-inventory/recommended/info/381295
export const getHotItems = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        referenceId: 381295,
        categoryId: 127598,
      },
      {
        referenceId: 23917,
        categoryId: 127598,
      },
      {
        referenceId: 83377,
        categoryId: 127598,
      },
    ]);
  }, (500));
});
