const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? "Выберите значение";

    const items = data.map( item => {

        let cls = '';
        if (item.id === selectedId){
            text = item.value;
            cls = 'selected';
        }
        return `<div class="select-dropdown__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</div>       `
    });

    return `
    <div class="select-backdrop" data-type="backdrop"></div>
    <div class="select-input" data-type="input">
        <span data-type="value">${text}</span>
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
    </div>
    <div class="select-dropdown">
            ${items.join('')}
    </div>
    `
};

export class Select {
    constructor(selector, options){
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;

        this.#render();
        this.#setup();
    }

    #render() {

        const {placeholder, data} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);

    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$value = this.$el.querySelector('[data-type="value"]');

    }

    clickHandler(event) {
        const eventTarget = event.target.closest('div');
        const type = eventTarget.dataset.type;

        if(type === "input"){
            this.toggle();            
        }else if(type === "item"){
            const id = eventTarget.dataset.id;
            this.select(id);
        }else if(type === "backdrop"){
            this.close();
        }
    }

    get isOpen(){
        return this.$el.classList.contains('open');
        
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }

    get current(){
        return this.options.data.find( item => item.id === this.selectedId);

    }

    select(id){
        this.selectedId = id;
        this.$value.textContent = this.current.value;

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected');
        });
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

        this.options.onSelect ? this.options.onSelect(this.current) : null;

        this.close();
    }

    open(){
        this.$el.classList.add('open');
    }

    close(){
        this.$el.classList.remove('open');
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}