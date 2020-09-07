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
                    <app-input
                      v-model="newReview.author"
                      :errorMessage="validation.firstError('newReview.author')"
                      title="Имя автора"
                    />
                  </div>
                  <div class="user-info-col">
                    <app-input
                      v-model="newReview.occ"
                      :errorMessage="validation.firstError('newReview.occ')"
                      title="Титул автора"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <app-input
                  v-model="newReview.text"
                  :errorMessage="validation.firstError('newReview.text')"
                  field-type="textarea"
                  title="Отзыв"
                />
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
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  components: { card, appButton, appInput },
  mixins: [ValidatorMixin],
  validators: {
    "newReview.author": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newReview.occ": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newReview.text": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
  props: {
    newReview: Object,
  },
  data() {
    return {
      hovered: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions({
      addNewReviewAction: "reviews/add",
      updateReviewAction: "reviews/update",
      showTooltip: "tooltips/show",
    }),
    hideAddingCard() {
      this.$emit("hideAddingCard");
    },
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if ((await this.$validate()) === false) return;
      if (this.newReview.id) {
        try {
          await this.updateReviewAction(this.newReview);
          this.$emit("hideAddingCard");
          this.showTooltip({
            text: "Отзыв обновлен",
            type: "success",
          });
        } catch (error) {
          console.log(error);
          this.showTooltip({
            text: error.message,
            type: "error",
          });
        }
      } else {
        try {
          await this.addNewReviewAction(this.newReview);
          this.$emit("hideAddingCard");
          this.showTooltip({
            text: "Отзыв добавлен",
            type: "success",
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error",
          });
        }
      }
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