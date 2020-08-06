import {Select} from "./select/select.js";
import "./select/select.scss";


const select = new Select("#select", {
    placeholder: "Выберите пожалуйста текст",
    // selectedId: '2',
    data: [
        {id: "1", value: "React"},
        {id: "2", value: "Angular"},
        {id: "3", value: "Vue"},
        {id: "4", value: "Flutter"},
        {id: "5", value: "Svelte"},
        {id: "6", value: "React Native"},
        {id: "7", value: "Dart"},
        {id: "8", value: "Vanilla JS"},
        {id: "9", value: "Nuxt"}
    ],
    onSelect(item){
        console.log("Select item", item)
    }
});

window.s = select;