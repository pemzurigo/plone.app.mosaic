/**
 * This plugin is used to set an element to be editable.
 *
 * @author Rob Gietema
 * @version 0.1
 * @licstart  The following is the entire license notice for the JavaScript
 *            code in this page.
 *
 * Copyright (C) 2011 Plone Foundation
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * @licend  The above is the entire license notice for the JavaScript code in
 *          this page.
 */
"use strict";

/*global jQuery: false, window: false */
/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true,
eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true,
immed: true, strict: true, maxlen: 80, maxerr: 9999 */

(function ($, tinymce) {

    tinymce.create('tinymce.themes.PloneTheme', {
        init: function(ed, url) {
            var t = this,
                s = ed.settings;
            t.editor = ed;
        },

        renderUI: function(o) {
            return {
                deltaHeight: 0
            };
        },

        getInfo: function() {
            return {
                longname: 'Mosaic theme',
                author: 'Plone Foundation',
                authorurl: 'http://plone.org',
                version: tinymce.majorVersion + "." + tinymce.minorVersion
            };
        }
    });

    tinymce.ThemeManager.add('mosaic', tinymce.themes.PloneTheme);

    // Define mosaic namespace if it doesn't exist
    if (typeof($.mosaic) === "undefined") {
        $.mosaic = {};
    }

    // Define the editor namespace
    $.mosaic.editor = {
    };

    /**
    * Create a new instance of the mosaic editor.
    *
    * @constructor
    * @id jQuery.fn.mosaicEditor
    * @return {Object} Returns a new mosaic editor object.
    */
    $.fn.mosaicEditor = function () {
        var obj;

        // Get element
        obj = $(this);

        // Generate random id
        var random_id = 1 + Math.floor(100000 * Math.random());
        while ($("#mosaic-rich-text-init-" + random_id,
               $.mosaic.document).length > 0) {
            random_id = 1 + Math.floor(100000 * Math.random());
        }
        $(this).attr('id', 'mosaic-rich-text-init-' + random_id);

        // Init rich editor
        tinyMCE.init({
            mode : "exact",
            elements : "mosaic-rich-text-init-" + random_id,
            content_editable : true,
            theme : "mosaic",
            language_load : false,
            formats : {
                strong : {inline : 'strong'},
                em : {inline : 'em'},
                h2 : {block : 'h2', remove : 'all'},
                h3 : {block : 'h3', remove : 'all'},
                p : {block : 'p', remove : 'all'},
                sub : {inline : 'sub', remove : 'all'},
                sup : {inline : 'sup', remove : 'all'},
                discreet : {block : 'p',
                            attributes : {'class' : 'discreet'},
                            remove : 'all'},
                pre : {block : 'pre', remove : 'all'},
                pullquote : {block: 'q',
                             attributes: {'class' : 'pullquote'},
                             remove: 'all'},
                callout : {block: 'p',
                           attributes: {'class' : 'callout'},
                           remove: 'all'},
                highlight : {inline: 'span',
                             attributes: {'class' : 'visualHighlight'},
                             remove: 'all'},
                pagebreak : {block: 'p',
                             attributes: {'class' : 'pagebreak'},
                             remove: 'all'},
                'justify-left' : {selector: 'p,h2,h3,pre,q',
                                  attributes: {'class' : 'justify-left'},
                                  remove: 'all'},
                'justify-center' : {selector: 'p,h2,h3,pre,q',
                                    attributes: {'class' : 'justify-center'},
                                    remove: 'all'},
                'justify-right' : {selector: 'p,h2,h3,pre,q',
                                   attributes: {'class' : 'justify-right'},
                                   remove: 'all'},
                'justify-justify' : {selector: 'p,h2,h3,pre,q',
                                     attributes: {'class' : 'justify-justify'},
                                     remove: 'all'}
            },
            valid_elements : "@[id|class|title|dir<ltr?rtl|lang|xml::lang]," +
                "a[rel|rev|charset|hreflang|tabindex|accesskey|type|" +
                "name|href|target|title|class]," +
                "strong/b,em/i,strike,u,#p,-sub,-sup,-blockquote," +
                "-div,-span,-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr," +
                "-ol[type|compact],-ul[type|compact],-li,dd,dl,dt," +
                "br,abbr,acronym,del[datetime|cite],ins[datetime|cite]," +
                "bdo,dfn,kbd,q[cite],samp,small,var,big"
        });

        // Set editor class
        obj.addClass('mosaic-rich-text');
    };

    /**
     * Exec a command on the editor
     *
     * @id jQuery.mosaic.execCommand
     * @param {String} command Command to execute
     * @param {String} ui UI to use
     * @param {String} value Vale of the command
     */
    $.mosaic.execCommand = function (command, ui, value) {

        // Exec command
        tinyMCE.activeEditor.execCommand(command, ui, value);
    };

    /**
     * Apply formatting to the current selection
     *
     * @id jQuery.mosaic.editor.applyFormat
     * @param {String} format Name of the registered format to apply
     */
    $.mosaic.editor.applyFormat = function (format) {

        // Apply format
        tinyMCE.activeEditor.formatter.apply(format);
    };

    /**
     * Register format
     *
     * @id jQuery.mosaic.editor.registerFormat
     * @param {String} name Name of the registered format to apply
     * @param {Object} format Formatting object
     */
    $.mosaic.editor.registerFormat = function (name, format) {

        // Apply format
        tinymce.activeEditor.formatter.register(name, format);
    };

})(jQuery, tinymce);

