export const dottedKeyToObject = (obj) => {
   const key = Object.keys(obj)[0];
   const value = Object.values(obj)[0];
   let newObj = {};
   const keySplitted = key.split('.');
   const lastKey = keySplitted[keySplitted.length - 1];

   keySplitted.reduce((a, i) => {
      if(i == lastKey) {
         a[i] = value;
      }
      else {
         a[i] = {};
      }
      return a[i];
   }, newObj);

   return newObj;
};
