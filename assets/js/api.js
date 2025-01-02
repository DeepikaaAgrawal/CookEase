// "use strict";

// window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
// // window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2/?type=public&app_id=3f74692c&app_key=4e0a97c0ee9047cbaef43447f52b0e3a";
// // window.ACCESS_POINT = "localhost:3000/recipe";
// // window.ACCESS_POINT = "https://my-proxy-server-da7c.onrender.com/recipe";
// // https://api.edamam.com/api/recipes/v2/?type=public&app_id=3f74692c&app_key=4e0a97c0ee9047cbaef43447f52b0e3a&q=chicken

// // https://api.edamam.com/api/recipes/v2?type=public&app_id=3f74692c&app_key=4e0a97c0ee9047cbaef43447f52b0e3a&field=uri&field=label&field=image&field=totalTime&cuisineType=French
// // https://api.edamam.com/api/recipes/v2?type=public&app_id=3f74692c&app_key=4e0a97c0ee9047cbaef43447f52b0e3a&field=uri&field=label&field=image&field=totalTime&cuisineType=French

// /**
//  *
//  * @param {Array} queries Query array
//  * @param {Function} successCallback Success callback function
//  */

// export const fetchData = async function (queries, successCallback) {
//   const query = queries
//     ?.join("&")
//     .replace(/,/g, "=")
//     .replace(/ /g, "20%")
//     .replace(/\+/g, "2B%");

//   const url = `${ACCESS_POINT}?${query ? `&${query}` : ""}`;

//   const response = await fetch(url);

//   if (response.ok) {
//     const data = await response.json();
//     successCallback(data);
//   }
// };


"use strict";

////////////////////////////////////////////////////////////////////////////////
// 1) Keep a constant base URL
////////////////////////////////////////////////////////////////////////////////
window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";

// 2) Put your Edamam credentials here
const EDAMAM_ID = "3f74692c";
const EDAMAM_KEY = "4e0a97c0ee9047cbaef43447f52b0e3a";

/**
 * 
 * @param {Array} queries Query array (e.g. [ ["q","chicken"], ["field","image"] ])
 * @param {Function} successCallback Success callback function
 */
export const fetchData = async function (queries, successCallback) {

  // Ensure queries is always an array
  const queryString = queries
    ?.join("&")                   //  e.g. "q,chicken&field,image"
    .replace(/,/g, "=")          //  -> "q=chicken&field=image"
    .replace(/ /g, "20%")        //  replace spaces
    .replace(/\+/g, "2B%")       //  replace '+' if needed
    || "";                       //  if no queries are passed, it's an empty string

  ////////////////////////////////////////////////////////////////////////////
  // 3) Build the final URL. We *always* append type=public, app_id, and app_key
  ////////////////////////////////////////////////////////////////////////////
  // If detail.js has already appended "/:recipeId" to ACCESS_POINT, 
  // we just add the "?type=public&..." part after that slash.
  ////////////////////////////////////////////////////////////////////////////
  let url = `${ACCESS_POINT}?type=public&app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}`;

  // If we have extra queries (e.g. q=chicken, mealType=dinner, etc.), add them
  if (queryString) {
    url += `&${queryString}`;
  }

  ////////////////////////////////////////////////////////////////////////////
  // 4) Make the fetch call
  ////////////////////////////////////////////////////////////////////////////
  const response = await fetch(url);

  if (!response.ok) {
    console.log("Fetch Error URL =>", url);
    throw new Error(`Network response was not ok (status ${response.status}).`);
  }

  const data = await response.json();
  successCallback(data);
};
