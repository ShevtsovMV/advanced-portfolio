<template>
  <div class="works-page-component">
    <div class="page-content">
      <div class="container-admin">
        <div class="header">
          <div class="title">Блок «Работы»</div>
        </div>
      </div>
      <div class="container-page-content">
        <div class="form" v-if="showAddingCard">
          <app-form 
            :newWork="newWork" 
            @hideAddingCard="hideAddingCard"
          />
        </div>
        <ul class="cards">
          <li class="item">
            <appButton 
              type="square"
              title="Добавить работу"
              @click="showAddingCard = true"
            />
          </li>
          <li class="item" v-for="work in works" :key="work.id">
            <work-card
              :work="work"
              @delete-work="deleteWork"
              @edit-work="editWork"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import appForm from "../../components/workForm";
  import workCard from "../../components/workCard";
  import appButton from "../../components/button";
  import { mapState, mapActions } from "vuex";

  export default {
    components: { appForm, workCard, appButton },
    data() {
      return {
        showAddingCard: false,
        newWork: {
          title: "",
          link: "",
          description: "",
          techs: "",
          photo: {},
          preview: "",
      },
      };
    },
    computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
    },
    methods: {
      ...mapActions({
        fetchWorksAction: "works/fetch",
        deleteWorkAction: "works/delete",
      }),
      deleteWork (workId) {
        this.deleteWorkAction(workId);
      },
      editWork(work) {
        this.newWork = {...work,
          preview: 'https://webdev-api.loftschool.com/' + work.photo,
          photo: {},
        };
        this.showAddingCard = true;
      },
      hideAddingCard() {
        this.showAddingCard = false;
        this.newWork = { ...{
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
      this.fetchWorksAction();
    },
  };
</script>

<style lang="postcss" scoped src="./works.pcss"></style>