<template>
  <div class="app-container">
    <router-view name="header" />
    <router-view />
    <div :class="['notify-container', {active: isTooltipShown}]">
      <div class="notification">
        <notification 
          :text="tooltipText"
          :type="tooltipType"
          @click="hideTooltip"
        />
      </div>
    </div>
  </div>
</template>

<script>
import notification from "./components/notification/notification";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    notification
  },
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: state => state.isShown,
      tooltipText: state => state.text,
      tooltipType: state => state.type,
    }),
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    }),
  },
}
</script>

<style lang="postcss">
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

.container-page-content {
  margin: 0 auto;
  width: 95%;

  @include phones {
    width: 100%;
  }
}

.page-content {
  flex: 1;
  background: url("../images/bg/admin.png") center center / cover no-repeat;
  padding: 54px 0 30px;

  @include phones {
    padding: 30px 0;
  }
}
</style>

<style lang="postcss" scoped src="./app.pcss"></style>