<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit" @reset.prevent="hideAddingCard">
      <card title="Редактирование работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[ 'uploader', {active: newWork.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button title="Загрузить" typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input
                  v-model="newWork.title"
                  :errorMessage="validation.firstError('newWork.title')"
                  title="Название"
                />
              </div>
              <div class="form-row">
                <app-input
                  v-model="newWork.link"
                  :errorMessage="validation.firstError('newWork.link')"
                  title="Ссылка"
                />
              </div>
              <div class="form-row">
                <app-input
                  v-model="newWork.description"
                  :errorMessage="validation.firstError('newWork.description')"
                  field-type="textarea"
                  title="Описание"
                />
              </div>
              <div class="form-row">
                <tags-adder
                  v-model="newWork.techs"
                  :errorMessage="validation.firstError('newWork.techs')"
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
import tagsAdder from "../tagsAdder";
import { mapActions } from "vuex";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  components: { card, appButton, appInput, tagsAdder },
  mixins: [ValidatorMixin],
  validators: {
    "newWork.title": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newWork.link": value => {
      return Validator.value(value).required("Не может быть пустым").url("Введите валидную ссылку");
    },
    "newWork.description": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "newWork.techs": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
  props: {
    newWork: Object,
  },
  data() {
    return {
      hovered: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions({
      addNewWorkAction: "works/add",
      updateWorkAction: "works/update",
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
      if (this.newWork.id) {
        await this.updateWorkAction(this.newWork);
      } else {
        await this.addNewWorkAction(this.newWork);
      }
      this.$emit("hideAddingCard");
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];
      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./workForm.pcss" lang="postcss" scoped></style>