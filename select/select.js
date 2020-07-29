const getTemplate = () => {
    return `
    <div class="select-input" data-type="input">
        <span>Выберите значение</span>
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
    </div>
    <div class="select-dropdown">
        <div class="select-dropdown__item">React</div>                
        <div class="select-dropdown__item">Angular</div>                
        <div class="select-dropdown__item">Vue</div>                
        <div class="select-dropdown__item">Flutter</div>                
        <div class="select-dropdown__item">Svelte</div>                
        <div class="select-dropdown__item">React Native</div>              
        <div class="select-dropdown__item">Dart</div>              
        <div class="select-dropdown__item">Vanila JS</div>              
        <div class="select-dropdown__item">Nuxt</div>              
    </div>
    `
}

export class Select {
    constructor(selector, options){
        this.$el = document.querySelector(selector);

        this.#render();
        this.#setup();
    }

    #render() {
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate();
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
    }

    clickHandler(event) {
        const eventTarget = event.target.closest('div')
        const type = eventTarget.dataset.type;
        console.log(eventTarget);
        console.log(type);
        if(type === "input"){
            this.toggle();            
        }
    }

    get isOpen(){
        return this.$el.classList.contains('open');
        
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }

    open(){
        this.$el.classList.add('open');
    }

    close(){
        this.$el.classList.remove('open');
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler)
    }
}