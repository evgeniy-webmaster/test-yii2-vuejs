jQuery(function ($) {
    window.vm = new Vue({
        el: '#docInterface',
        data: {
            docs: [],
            mode: 'list', //list or doc
            currentDoc: null,
            errorMsg: '',
            infoMsg: '',
        },
        methods: {
            save: function (doc) {
                if(doc.title == '') this.errorMsg = 'Title field is required.'
                else {
                    if(doc.id !== undefined)
                        $.ajax({
                            url: "/docs/" + doc.id,
                            type: "PATCH",
                            data: doc,
                            dataType: "json",
                            success: function(data) {
                                vm.infoMsg = 'Document is updated.'
                            }
                        })
                    else
                        $.ajax({
                            url: "/docs" ,
                            type: "POST",
                            data: doc,
                            dataType: "json",
                            success: function(data)  {
                                vm.currentDoc = data
                                vm.infoMsg = 'Document is created.'
                            }
                        })
                }
            },
            viewDoc: function (id) {
                this.clearMsgs()
                if(typeof id === 'number') {
                    $.ajax({
                        url: "/docs/" + id,
                        type: "GET",
                        data: { id: id },
                        dataType: "json",
                        success: function(data){
                            vm.currentDoc = data
                        }
                    })
                }
                this.currentDoc = {
                    title: '',
                    text: '',
                }
                this.mode = 'doc'
            },
            viewDocList: function () {
                this.clearMsgs()
                this.mode = 'list'
                $.getJSON('/doc', function (docs) {
                    vm.docs = docs
                })
            },
            deleteDoc: function (id) {
                $.ajax({
                    url: "/docs/" + id,
                    type: "DELETE",
                    dataType: "json",
                    success: function(data){
                        console.log(data)
                        vm.infoMsg = 'Document ' + id + ' was been deleted.'
                        vm.docs = vm.docs.filter(function (e) {
                            return e.id !== id
                        })
                    }
                })
            },
            clearMsgs: function () {
                this.infoMsg = ''
                this.errorMsg = ''
            }
        },
        components: {
            'doc-list': {
                template: '#docListTpl',
                props: ['docs'],
                methods: {
                    editDoc: function (id) {
                        this.$emit('edit-doc', id)
                    },
                    deleteDoc: function (id) {
                        this.$emit('delete-doc', id)
                    }
                }
            },
            'doc': {
                template: '#docTpl',
                props: {
                    doc: {
                        type: Object,
                        default: function () {
                            return {
                                title: '',
                                text: '',
                            }
                        },
                    }
                },
                data: function () {
                    return {
                        title: this.title,
                        text: this.text
                    }
                },
                methods: {
                    save: function () {
                        this.$emit('save', this.doc)
                    }
                }
            }
        }
    })

    $.getJSON('/docs', function (docs) {
        vm.docs = docs
    })

})
