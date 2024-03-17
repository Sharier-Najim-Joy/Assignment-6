const categoryPostContainer = document.getElementById(
  "category-post-container"
);
const titleCardContainer = document.getElementById("title-card-container");
const countTitle = document.getElementById("count-title");
const latestPostContainer = document.getElementById("latest-post-container");
const searchInputField = document.getElementById("search-input-field");
const searchBtn = document.getElementById("search-button");

// search button

searchBtn.addEventListener("click", async () => {
  barsIsLoading(true);
  const searchInputText = searchInputField.value;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInputText}`
  );
  const data = await res.json();
  const { posts } = data;
  displayPostLoadData(posts);
  searchInputField.value = "";
});

const loadFetchData = async () => {
  barsIsLoading(true);
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const { posts } = data;
    displayPostLoadData(posts);
  } catch {
    console.error("data load", error);
  }
};

const displayPostLoadData = (posts) => {
  // category post content clear textContent
  categoryPostContainer.textContent = "";
  posts.forEach((post) => {
    const {
      image,
      author,
      category,
      title,
      description,
      view_count,
      comment_count,
      posted_time,
      isActive,
    } = post;

    const newDiv = document.createElement("div");
    newDiv.className =
      "grid grid-cols-12 justify-center p-6 rounded-3xl my-8 bg-[#F3F3F5] border-2 hover:border-[#797DFC] hover:bg-[#797DFC1A] ";
    newDiv.innerHTML = `
            <div class="col-span-12 md:col-span-2">
                ${
                  isActive
                    ? `<div class="avatar online">
                        <div class="w-20 rounded-2xl">
                        <img src="${image}" />
                        </div>
                    </div>`
                    : `<div class="avatar offline">
                        <div class="w-20 rounded-2xl">
                        <img src="${image}" />
                        </div>
                    </div>`
                }
            </div>
            <div class="col-span-12 md:col-span-10 space-y-3" >
                <div class="flex space-x-6">
                    <h4 class="text-[#12132DCC] font-inter text-sm">#<span>${category}</span></h4>
                    <h4 class="">Author : ${author?.name}</h4>
                </div>
                <h3 class="font-bold text-xl text-[#12132D]">${title}</h3>
                <p class="border-b-2 border-dashed pb-6 text-[#12132DCC] font-inter ">${description}</p>
                <div class="flex justify-between gap-2 pt-3">
                    <div class="flex space-x-2 md:space-x-6">
                        <p class="flex gap-2 text-[#12132D99]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                            <span>${comment_count}</span>
                        </p>

                        <p class="flex gap-2 text-[#12132D99]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                       </svg>

                            <span>${view_count}</span>
                        </p>
                        <p class="flex gap-2 text-[#12132D99]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                      
                            <span>${posted_time}</span>
                        </p>
                    </div>
                    <div onclick="categoryTitle('${title.replace(/'/,"")}', '${view_count}')" class="bg-[#10B981] rounded-full">
                        <i class="fa-regular fa-envelope-open text-white p-3"></i>
                    </div>
                </div>
            </div>
        `;

    categoryPostContainer.appendChild(newDiv);

    // spinner
    barsIsLoading(false);
  });
};

// initial counts
let CardsCount = 0;
// title added this section
const categoryTitle = (title, view_count) => {
  const titleReplace = title.replace("Beginners", "Beginner's");

  const newTitleDiv = document.createElement("div");
  newTitleDiv.className = "flex justify-between bg-white p-4 rounded-xl mb-6";
  newTitleDiv.innerHTML = `
    <h4 class="text-base font-semibold">${titleReplace}</h4>
    <div class="flex justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
   </svg>
        <span class="pl-2">${view_count}</span>
    </div>
    `;
  titleCardContainer.appendChild(newTitleDiv);
  CardsCount++;

  // set count title count number
  countTitle.innerText = CardsCount;
};

loadFetchData();

// latest post
const latestPostFetchDataLoad = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    displayLatestPostData(data);
  } catch {
    console.error("latest data", error);
  }
};

const displayLatestPostData = (LatestPosts) => {
  LatestPosts.forEach((latestPost) => {
    const {
      author,
      cover_image,
      description,
      profile_image,
      title,
      name,
      designation,
    } = latestPost;

    const newLatestPost = document.createElement("div");
    newLatestPost.className =
      "card  bg-base-100 shadow-xl border-2 border-gray-300";
    newLatestPost.innerHTML = `
            <figure class="px-9 pt-9"><img class="rounded-lg" src="${cover_image}" alt="Shoes" /></figure>
            <div class="card-body space-y-3">
                <h3 class="flex gap-3 items-center text-[18px] font-normal text-[#12132D99]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              <span>${
                  author?.posted_date ? author?.posted_date : "No Publish Date"
                }</span></h3>
                <h2 class="font-extrabold text-[18px] text-[#12132D]">${title}</h2>
                <p class="font-normal text-base text-[#12132D99]">${description}</p>
                <div class="flex items-center">
                    <div class="avatar pr-3">
                        <div class="w-14 rounded-full">
                        <img src="${profile_image}" />
                        </div>
                    </div>
                    <div>
                        <h4 class="text-[#12132D] text-base font-bold">${author?.name}</h4>
                        <h5 class="text-[#12132D99] text-sm font-sm">${
                          author?.designation ? author?.designation : "UnKnown"
                        }</h5>
                    </div>
                </div>
            </div>
        `;
    latestPostContainer.appendChild(newLatestPost);
  });
};

latestPostFetchDataLoad();
