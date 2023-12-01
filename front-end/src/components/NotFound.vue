<template>
  <div id="notfound" class="relative h-screen">
    <div
      class="notfound absolute left-2/4 top-2/4 w-full max-w-[560px] pl-[160px] leading-[1.1]"
    >
      <div
        class="notfound-404 absolute left-0 top-0 inline-block w-[140px] h-[140px] bg-cover bg-[url('@/assets/images/emoji.png')]"
      ></div>
      <h1
        class="text-[65px] font-bold mt-0 mb-[10px] text-[#151723] uppercase font-nunito"
      >
        404
      </h1>
      <h2
        class="font-nunito text-[21px] font-normal m-0 uppercase text-[#151723]"
      >
        Oops! Page Not Be Found
      </h2>
      <p class="font-nunito text-[#999fa5] font-normal">
        Sorry but the page you are looking for does not exist, have been
        removed. name changed or is temporarily unavailable
      </p>
      <router-link
        to="/chat"
        class="font-nunito inline-block font-bold rounded-[40px] no-underline text-[#388dbc]"
      >
        Back to homepage
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#notfound {
  $translate: -50%;
  $fullscreen: 100%;
  $scale: 2.4;
  $bg-color: #f2f5f8;

  .notfound {
    -webkit-transform: translate($translate, $translate);
    -ms-transform: translate($translate, $translate);
    transform: translate($translate, $translate);

    .notfound-404 {
      &::before {
        content: "";
        position: absolute;
        width: $fullscreen;
        height: $fullscreen;
        -webkit-transform: scale($scale);
        -ms-transform: scale($scale);
        transform: scale($scale);
        border-radius: calc($fullscreen / 2);
        background-color: $bg-color;
        z-index: -1;
      }
    }
  }
}
</style>
