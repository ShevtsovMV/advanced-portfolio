import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const thumbs = {
  props: ["currentWork", "works"],
  template: "#works-slider-thumbs"
};

const buttons = {
  template: "#works-slider-buttons",
};

const display = {
  props: ["currentWork", "works", "currentIndex"],
  template: "#works-slider-display",
  components: {
    thumbs,
    buttons
  },
};

const tags = {
  props: ["tags"],
  template: "#works-slider-tags"
};

const info = {
  props: ["currentWork"],
  template: "#works-slider-info",
  components: {
    tags
  },
  computed: {
    tagsArray() {
      return this.currentWork.techs.split(",");
    }
  }
};

new Vue({
  el: "#works-slider-component",
  template: "#works-slider-container",
  components: {
    display,
    info
  },
  data() {
    return {
      works: [],
      currentIndex: 0,
      isDownloaded: false,
    };
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    },
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForNdx(value);
    }
  },
  methods: {
    makeInfiniteLoopForNdx(index) {
      const worksNumber = this.works.length - 1;
      if (index < 0) this.currentIndex = worksNumber;
      if (index > worksNumber) this.currentIndex = 0;
    },
    requireImagesToArray(data) {
      return data.map(item => {
        const requireImage = `${config.BASE_URL}/${item.photo}`;
        item.photo = requireImage;
        return item
      });
    },
    slide(direction) {
      switch(direction) {
        case "next" :
          this.currentIndex++;
          break;
        case "prev" :
          this.currentIndex--;
          break;
          default :
          this.currentIndex = direction;
          break;
      }
    }
  },
  async created() {
    const {data} = await axios.get("works/373");
    this.works = this.requireImagesToArray(data);
    this.isDownloaded = true;
  },
  
});