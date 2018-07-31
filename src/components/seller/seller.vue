<template>
  <div class="seller" ref = "seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star class="stars" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公共与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="item.type">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref = "pic-wrapper">
          <ul class="pic-list" ref = "pic-list">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.info" :key="index">
            <span class="text">{{info}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {saveToLocal, loadFromLocal} from '../../common/js/store.js';
  import BScroll from 'better-scroll';
  import star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText: function () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    components: {
      star,
      split
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      toggleFavorite: function (event) {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initPics: function () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width;
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      }
    },
    mounted: function () {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

.seller
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview
    padding: 18px
    font-size: 0
    position: relative
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
      line-height: 14px
    .desc
      margin-top: 8px
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom:  18px
      .stars
        display: inline-block
        margin-right: 8px
        vertical-align: top
      .text
        display: inline-block
        vertical-align: top
        font-size: 10px
        padding-right: 12px
        color: rgb(77, 85, 93)
        line-height: 18px
    .remark
      padding-top: 18px
      display: flex
      .block
        flex: 1
        text-align: center
        border-right:1px solid rgba(7, 17, 27, 0.1)
        padding-bottom: 18px
        &:last-child
          border: none
        .title
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
          padding-bottom: 4px
        .content
          .stress
            font-size: 24px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 24px
    .favorite
      position: absolute
      width: 50px
      right: 5px
      top: 18px
      text-align: center
      .icon-favorite
        display: block
        color: #d4d6d9
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        &.active
          color: rgb(240, 20, 20)
      .text
        font-size: 10px
        line-height: 10px
        color: rgb(77, 85, 93)
  .bulletin
    padding: 18px 18px 0 18px
    font-size: 0
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
      line-height: 14px
      margin-bottom: 8px
    .content-wrapper
      .content
        font-size: 12px
        font-weight: 200
        color: rgb(240, 20, 20)
        line-height: 24px
        padding-left: 12px
        padding-bottom: 16px
        border-1px(rgba(7, 17, 27, 0.1))
    .supports
      .support-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 16px
          color: rgb(7, 17, 27)
  .pics
    padding: 18px
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
      line-height: 14px
      margin-bottom: 12px
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
  .info
    padding: 18px 18px 0 18px
    .title
      padding-bottom: 12px
      line-height: 14px
      border-1px(rgba(7, 17, 27, 0.1))
      color: rgb(7, 17, 27)
      font-size: 14px
    .info-item
      padding: 16px 12px
      line-height: 16px
      font-size: 14px
      font-weight: 200
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
</style>
