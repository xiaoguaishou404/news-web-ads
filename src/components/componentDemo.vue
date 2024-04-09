<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import type { TitleInfo, ToDo } from '../type'

export default defineComponent({
  name: 'ComponentDemo',
  props: {
    titleInfo: {
      type: Object as PropType<TitleInfo>,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      items: [] as ToDo[],
      todoName: '',
    }
  },
  computed: {
    doubleCounter(): number {
      return this.counter * 2
    },
  },
  created() {
    this.items.push({ id: 1, name: 'test', completed: false })
  },
  methods: {
    addTodo(todo: ToDo): void {
      this.items.push(todo)
      this.todoName = ''
    },
    newTodo(name: string): ToDo {
      return { id: this.items.length, name, completed: false }
    },
  },
})
</script>

<template>
  <div>
    {{ counter }}{{ doubleCounter }}
  </div>
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
  <div :style="{ color: titleInfo.color }">
    {{ titleInfo.title }}
  </div>
  <input v-model="todoName" type="text" @keyup.enter="addTodo(newTodo(todoName))">
</template>../../type../type
