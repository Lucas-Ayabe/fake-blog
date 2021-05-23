// @ts-check

/**
 * @typedef {Object} Post
 * @property {number} userId
 * @property {number} id
 * @property {string} title
 * @property {string} body
 */

function modal() {
  return {
    isOpen: false,
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  };
}

function posts() {
  return {
    /** @type {Post[]} */
    originalPosts: [],

    /** @type {Post[]} */
    posts: [],

    search: "",

    /**
     * @param {(prop: string, callback: (...data: any[]) => void) => void} watch
     */
    async loadPosts(watch) {
      watch("search", () => this.filterPosts());

      const endpoint = "https://jsonplaceholder.typicode.com/posts";

      /** @type {Post[]} */
      const loadedPosts = await (await fetch(endpoint)).json();
      this.originalPosts = loadedPosts.reverse();
      this.posts = loadedPosts;
      console.log(this.posts.length);
    },
    filterPosts() {
      console.log(this.posts.length);
      if (this.search === "") {
        this.posts = this.originalPosts;
      } else {
        this.posts = this.originalPosts.filter((post) =>
          post.title.includes(this.search)
        );
      }
    },
    addPost() {
      console.log("post added");
    },
  };
}
