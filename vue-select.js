var VueSelect = Vue.extend({
  template: '<div class="btn-group">' +
              '<button type="button" class="btn btn-default">{{ value ? value.name : "请选择" }}</button>' +
              '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<span class="caret"></span>' +
                '<span class="sr-only">Toggle Dropdown</span>' +
              '</button>' +
              '<ul class="dropdown-menu">' +
                '<li v-if="search || searchFromServer" class="search"><input type="text" placeholder="搜索" @click.stop v-model="keyWords" debounce="searchFromServer ? 500 : 0" /></li>' +
                '<li v-for="option in searchOptions" @click="select(option)">' +
                  '<img :src="option.icon" alt="" class="img-thumbnail" />' +
                  '<label>{{ option.name }}</label>' +
                  '<span>{{ option.desc }}</span>' +
                '</li>' +
              '</ul>' +
            '</div>',
  props: {
    value: {
      twoWay: true
    },
    options: Array,
    searchFromServer: Boolean,
    search: Boolean
  },
  data () {
    return {
      keyWords: null
    }
  },
  computed: {
    searchOptions: function () {
      if (this.searchFromServer) {
        return this.options
      }
      if (this.keyWords === null) {
        return this.options
      }
      return this.options.filter(option => option.name.indexOf(this.keyWords) !== -1)
    }
  },
  watch: {
    keyWords: function () {
      if (this.searchFromServer) {
        this.$dispatch('search', this.keyWords)
      }
    }
  },
  methods: {
    select: function (option) {
      this.value = option
    }
  }
})
