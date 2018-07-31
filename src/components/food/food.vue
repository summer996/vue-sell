<template>
    <transition name="move">
      <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <div class="buy" @click="addFirst(food, $event)" v-show="!food.count || food.count === 0">加入购物车</div>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingSelect @ratingtype-select="ratingtypeSelect(type)" @content-toggle="contentToggle(onlyContent)" :select-type="selectType"
                          :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating.username" class="rating-item">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" width="12" height="12" class="avatar">
                  </div>
                  <div class="time">{{rating.rateTime | formateDate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import ratingSelect from '../../components/ratingSelect/ratingSelect.vue';
  import split from '../../components/split/split.vue';
  import {formateDate} from '../../common/js/date.js';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

    export default {
      props: {
        food: {
          type: Object
        }
      },
      components: {
        cartcontrol,
        split,
        ratingSelect
      },
      filters: {
        formateDate (time) {
          let date = new Date(time);
          return formateDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      data () {
        return {
          showFlag: false,
          onlyContent: true,
          selectType: ALL,
          desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }
        };
      },
      methods: {
        ratingtypeSelect: function (type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        contentToggle: function (onlyContent) {
          this.onlyContent = onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        needShow: function (type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        },
        addFirst: function (food, event) {
          Vue.set(food, 'count', 1);
        },
        show: function () {
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = true;
          this.$nextTick(() => {
              if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.food, {
                      click: true
                  });
              } else {
                  this.scroll.refresh();
              }
          });
        },
        hide: function () {
          this.showFlag = false;
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.5s linear
    &.move-enter, &.move-leave-to
      transform: translateX(100%)
      opacity: 0
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 18px
          font-size: 20px
          color: #fff
    .content
      position: relative
      background: #fff
      padding: 18px
      font-size: 0
      .title
        padding-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
        line-height: 14px
      .detail
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 10px
        height: 10px
        .sell-count
          padding-right: 12px
      .price
        margin-top: 18px
        .now
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
          line-height: 24px
          padding-right: 8px
        .old
          text-decoration: line-through
          font-size: 10px
          line-height: 24px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        padding: 0 12px
        color: #fff
        background: rgb(0, 160, 220)
        font-size: 10px
        height: 24px
        line-height: 24px
        border-radius: 12px
        border-sizing: border-box
    .info
      padding: 18px
      .title
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .text
        padding: 6px 8px 0 8px
        font-weight: 200
        font-size: 12px
        color: rgb(77, 85, 93)
        line-height: 24px
    .rating
      padding-top: 18px
      .title
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .rating-wrapper
        margin: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              vertical-align: top
              font-size: 10px
              margin-right: 6px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up,.icon-thumb_down
              line-height: 24px
              margin-right: 4px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
