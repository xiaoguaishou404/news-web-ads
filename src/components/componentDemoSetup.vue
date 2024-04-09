<script lang="ts" setup>
import { type PropType, computed, reactive, ref } from 'vue'
import type { TitleInfo, ToDo } from '../type'

defineProps({
  titleInfo: {
    type: Object as PropType<TitleInfo>,
    required: true,
  },
})

const counter = ref(0)
const doubleCounter = computed(() => counter.value * 2)

const items = ref<ToDo[]>([])
// const items = ref([] as ToDo[]);
// const items = reactive({
//     items: [] as ToDo[],
//     todoName: ''
// })
items.value.push({ id: 1, name: 'test', completed: false })

const todoName = ref('')
function addTodo(todo: ToDo): void {
  items.value.push(todo)
  todoName.value = ''
}
function newTodo(name: string): ToDo {
  return { id: items.value.length, name, completed: false }
}
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
</template>../../type
