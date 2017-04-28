<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div id="docListTpl" style="display: none;">
        <ul class="list-group">
            <li class="list-group-item" v-for="doc in docs">#{{doc.id}} <a @click="editDoc(doc.id)" href="#">{{doc.title}}</a> <button @click="deleteDoc(doc.id)" class="btn btn-xs btn-danger">delete</button></li>
        </ul>
    </div>

    <div id="docTpl" style="display: none;">
        <div>
            <div class="form-group">
                <label>
                    Title
                    <input class="form-control" type="text" v-model="doc.title" />
                </label>
            </div>
            <div class="form-group">
                <label>
                    Text
                    <textarea class="form-control" v-model="doc.text"></textarea>
                </label>
            </div>
            <div class="form-group">
                <button @click="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>

    <div id="docInterface">

        <div class="form-group">
            <button @click="viewDocList" class="btn btn-default">Documents list</button>
            <button @click="viewDoc" class="btn btn-success">Create document</button>
        </div>

        <div v-if="errorMsg !== ''" class="alert alert-danger">{{ errorMsg }}</div>
        <div v-if="infoMsg !== ''" class="alert alert-success">{{ infoMsg }}</div>

        <doc-list v-if="mode === 'list'" v-on:edit-doc="viewDoc" v-on:delete-doc="deleteDoc" :docs="docs"></doc-list>
        <doc v-if="mode === 'doc'" v-on:save="save" :doc="currentDoc"></doc>

    </div>
</div>
