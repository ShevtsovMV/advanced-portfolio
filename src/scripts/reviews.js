import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

new Vue({
  el: "#reviews-component",
  template: "#reviews-container",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      reviews: [],
      swiperOptions: {
        slidesPerView: 1,
        breakpoints: {
          // when window width is >= 481px
          481: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          // when window width is >= 1201
          1201: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      }
    };
  },
  methods: {
    requireImagesToArray(data) {
      return data.map(item => {
        const requireImage = require(`../images/content/${item.photo}`).default;
        item.photo = requireImage;
        return item
      });
    },
    slide(direction) {
      const swiper = this.$refs.mySwiper.$swiper;
      switch (direction) {
        case "next":
          swiper.slideNext();
          break;
        case "prev":
          swiper.slidePrev();
          break;
      }
    },
    enableDisableBtn() {
      const prevBtn = this.$refs.prevBtn;
      const nextBtn = this.$refs.nextBtn;
      this.swiper.on('progress', function (swiper, progress) {
        if (progress <= 0) {
          prevBtn.setAttribute("disabled", "disabled");
          nextBtn.removeAttribute("disabled");
        } else if (progress >= 1) {
          prevBtn.removeAttribute("disabled");
          nextBtn.setAttribute("disabled", "disabled");
        } else {
          prevBtn.removeAttribute("disabled");
          nextBtn.removeAttribute("disabled");
        };
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  },
  mounted() {
    this.enableDisableBtn();
  }
});