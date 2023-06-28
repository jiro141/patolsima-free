/*import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing
} from '@ckeditor/ckeditor5-image';

import {
    Essentials
} from '@ckeditor/ckeditor5-essentials';
import {
    UploadAdapter
} from '@ckeditor/ckeditor5-adapter-ckfinder';
import {
    Autoformat
} from '@ckeditor/ckeditor5-autoformat';
import {
    Bold,
    Italic
} from '@ckeditor/ckeditor5-basic-styles';
import {
    BlockQuote
} from '@ckeditor/ckeditor5-block-quote';
import {
    CKBox
} from '@ckeditor/ckeditor5-ckbox';
import {
    CKFinder
} from '@ckeditor/ckeditor5-ckfinder';
import {
    EasyImage
} from '@ckeditor/ckeditor5-easy-image';
import {
    Heading
} from '@ckeditor/ckeditor5-heading';

import {
    Indent
} from '@ckeditor/ckeditor5-indent';
import {
    Link
} from '@ckeditor/ckeditor5-link';
import {
    List
} from '@ckeditor/ckeditor5-list';
import {
    MediaEmbed
} from '@ckeditor/ckeditor5-media-embed';
import {
    Paragraph
} from '@ckeditor/ckeditor5-paragraph';
import {
    PasteFromOffice
} from '@ckeditor/ckeditor5-paste-from-office';
import {
    Table,
    TableToolbar
} from '@ckeditor/ckeditor5-table';
import {
    TextTransformation
} from '@ckeditor/ckeditor5-typing';*/

import CustomUploadAdapterPlugin from "api/ckeditor/imageUploadAdapter";


const CKEditorConfig = {
    /*/plugins: [
        Essentials,
        UploadAdapter,
        Autoformat,
        Bold,
        Italic,
        BlockQuote,
        CKBox,
        CKFinder,
        EasyImage,
        Heading,
        Image, 
        ImageCaption, 
        ImageStyle, 
        ImageToolbar, 
        ImageUpload, 
        PictureEditing,
        Indent,
        Link,
        List,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        Table,
        TableToolbar,
        TextTransformation,
    ],*/
    extraPlugins: [CustomUploadAdapterPlugin],
    patolsima_informe_id: 1
};

export default CKEditorConfig;