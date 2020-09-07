<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit" @reset.prevent="hideAddingCard">
      <card title="Редактирование работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${newReview.preview})`}"
                :class="[ 'uploader', {active: newReview.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-btn">
                  <app-button title="Добавить фото" typeAttr="file" @change="handleChange" plain></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <div class="user-info">
                  <div class="user-info-col">
                    <app-input v-model="newReview.author" title="Имя автора" />
                  </div>
                  <div class="user-info-col">
                    <app-input v-model="newReview.occ" title="Титул автора" />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <app-input v-model="newReview.text" field-type="textarea" title="Отзыв" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" typeAttr="reset" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" typeAttr="submit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../Card";
import appButton from "../button";
import appInput from "../input";
import { mapActions } from "vuex";

export default {
  components: { card, appButton, appInput },
  props: {
    newReview: Object,
  },
  data() {
    return {
      hovered: false,
    };
  },
  methods: {
    ...mapActions({
      addNewReviewAction: "reviews/add",
      updateReviewAction: "reviews/update",
    }),
    hideAddingCard() {
      this.$emit("hideAddingCard");
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (this.newReview.id) {
        await this.updateReviewAction(this.newReview);
      } else {
        await this.addNewReviewAction(this.newReview);
      }
      this.$emit("hideAddingCard");
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];
      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./reviewForm.pcss" lang="postcss" scoped></style>