<template>
  <div class="reviews-page-component">
    <div class="page-content">
      <div class="container-admin">
        <div class="header">
          <div class="title">Блок «Отзывы»</div>
        </div>
      </div>
      <div class="container-page-content">
        <div class="form" v-if="showAddingCard">
          <app-form 
            :newReview="newReview" 
            @hideAddingCard="hideAddingCard"
          />
        </div>
        <ul class="cards">
          <li class="item">
            <appButton 
              type="square"
              title="Добавить отзыв"
              @click="showAddingCard = true"
            />
          </li>
          <li class="item" v-for="review in reviews" :key="review.id">
            <review-card
              :review="review"
              @delete-review="deleteReview"
              @edit-review="editReview"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import appForm from "../../components/reviewForm";
  import reviewCard from "../../components/reviewCard";
  import appButton from "../../components/button";
  import { mapState, mapActions } from "vuex";

  export default {
    components: { appForm, reviewCard, appButton },
    data() {
      return {
        showAddingCard: false,
        newReview: {
          author: "",
          occ: "",
          text: "",
          photo: {},
          preview: "",
        },
      };
    },
    computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
    },
    methods: {
      ...mapActions({
        fetchReviewsAction: "reviews/fetch",
        deleteReviewAction: "reviews/delete",
        showTooltip: "tooltips/show",
      }),
      async deleteReview (reviewId) {
        try {
          await this.deleteReviewAction(reviewId);
          this.showTooltip({
            text: "Работа удалена",
            type: "success",
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error",
          });
        }
      },
      editReview(review) {
        this.newReview = {...review,
          preview: 'https://webdev-api.loftschool.com/' + review.photo,
          photo: {},
        };
        this.showAddingCard = true;
      },
      hideAddingCard () {
      this.showAddingCard = false;
      this.newReview = { ...{
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      } }
      },
    },
    created() {
      this.fetchReviewsAction();
    },
  };
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>