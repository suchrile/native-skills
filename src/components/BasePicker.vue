<template>
  <div class="picker">
    <div class="picker__wrapper">
      <div class="picker__body">
        <div class="picker__content">
          <swiper
            direction="vertical"
            slides-per-view="auto"
            :space-between="0"
            :centered-slides="true"
            :loop="true"
            :slide-to-clicked-slide="true"
            @swiper="initSwiper"
            class="slider"
            :resistance="false"
          >
            <swiper-slide v-for="slide in slides" :key="slide">
              {{ slide }}
            </swiper-slide>
          </swiper>
          <swiper
            direction="vertical"
            slides-per-view="auto"
            :space-between="0"
            :centered-slides="true"
            :loop="true"
            :slide-to-clicked-slide="true"
            @swiper="initSwiper"
            class="slider"
          >
            <swiper-slide v-for="slide in slides" :key="slide">
              {{ slide }}
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiper: null,
    }
  },
  computed: {
    slides() {
      const slides = []
      for (let i = 0; i <= 23; i++) {
        if (i <= 9) {
          slides.push('0' + i)
        } else {
          slides.push(i.toString())
        }
      }
      return slides
    },
    activeSlide() {
      if (this.swiper) {
        return this.swiper.activeIndex
      }
    },
  },
  methods: {
    initSwiper(swiper) {
      this.swiper = swiper
    },
  },
  mounted() {
    this.hours =
      new Date().getHours().toString().length < 2
        ? '0' + new Date().getHours()
        : new Date().getHours()
    const hourIdx = this.slides.find((el) => el === this.hours)
    setTimeout(() => this.swiper.slideTo(hourIdx), 1000)
  },
}
</script>

<style lang="scss">
.picker {
  width: rem(250);
  padding: rem(15) 0;
  border: 1px solid grey;
  border-radius: rem(12);

  &__wrapper {
    position: relative;

    &::before,
    &::after {
      content: '';
      left: 0;
      width: 100%;
      height: 35%;
      position: absolute;
      z-index: 2;
      pointer-events: none;
      border-radius: rem(12);
    }

    &::before {
      top: 0;
      background: linear-gradient(
        to top,
        rgba($color: $AppBackgroundColorDark, $alpha: 0),
        rgba($color: $AppBackgroundColorDark, $alpha: 1)
      );
    }
    &::after {
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba($color: $AppBackgroundColorDark, $alpha: 0),
        rgba($color: $AppBackgroundColorDark, $alpha: 1)
      );
    }
  }

  &__body {
    &::after {
      content: '';
      top: 50%;
      left: 5%;
      width: 90%;
      height: rem(30);
      background-color: #2d2d2f;
      border-radius: rem(10);
      transform: translateY(-50%);
      position: absolute;
      pointer-events: none;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    gap: rem(10);
    // width: 50%;
    margin: 0 auto;
  }
}

.slider {
  height: rem(180);
  margin: 0;
}

.swiper-slide {
  display: flex;
  align-items: center;
  max-height: rem(30);
  padding: 0 rem(25);
  font-size: rem(20);
}
</style>

<!-- <template>
  <div class="roll">
    <div class="elem">01</div>
    <div class="elem">02</div>
    <div class="elem">03</div>
    <div class="elem">04</div>
    <div class="elem">05</div>
    <div class="elem">06</div>
    <div class="elem">07</div>
    <div class="elem">08</div>
    <div class="elem">09</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.roll {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    top: 50%;
    left: 5%;
    width: 90%;
    height: rem(36);
    background-color: #2d2d2f;
    border-radius: rem(8);
    transform: translateY(-50%);
    position: absolute;
  }
}
.elem {
  font-size: rem(24);
  line-height: 1;
  padding: rem(6) 0;
  opacity: 0.8;
  z-index: 1;
}
.elem:nth-child(1) {
  transform: rotateX(80deg) translateY(850%);
  opacity: 0.15;
}
.elem:nth-child(2) {
  transform: rotateX(65deg) translateY(180%);
  opacity: 0.25;
}
.elem:nth-child(3) {
  transform: rotateX(50deg) translateY(50%);
  opacity: 0.35;
}
.elem:nth-child(4) {
  transform: rotateX(40deg) translateY(10%);
  opacity: 0.4;
}
.elem:nth-child(5) {
}
.elem:nth-child(6) {
  transform: rotateX(-40deg) translateY(-10%);
  opacity: 0.4;
}
.elem:nth-child(7) {
  transform: rotateX(-50deg) translateY(-50%);
  opacity: 0.35;
}
.elem:nth-child(8) {
  transform: rotateX(-65deg) translateY(-180%);
  opacity: 0.25;
}
.elem:nth-child(9) {
  transform: rotateX(-80deg) translateY(-850%);
  opacity: 0.15;
}
</style> -->
