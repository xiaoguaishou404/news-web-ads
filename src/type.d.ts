export type ToDo = {
    id: number,
    name: string,
    completed: boolean
}
export type TitleInfo ={
    title: string;
    color: string;
}
// declare type TitleInfo ={
//     title: string;
//     color: string;
// }
// declare声明是全局的，但是一个文件内不能同时使用declare和export
// export的d.ts文件可以在项目的任意地方，然后import就行了，不需要ts.config里面include包含的位置

