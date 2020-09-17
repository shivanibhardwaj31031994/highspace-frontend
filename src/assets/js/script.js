import $ from 'jquery'

$(document).ready(function(){
    var email_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	$('.social-logins').on('click','a',function(e){
        e.preventDefault();
    });
    $(document).on('click',function(e){
        let has_class=$(e.target).closest('.dropdown-menu').hasClass('show');
        $('.dropdown-menu').removeClass('show');
        if($(e.target).closest('.dropdown-menu').length>0){
            $(e.target).closest('.dropdown-menu').addClass('show');
        }else if($(e.target).closest('.dropdown-toggle').length>0){
            let tar=$(e.target).closest('.dropdown-toggle').closest('.dropdown').find('.dropdown-menu');
            if(!has_class){
                tar.addClass('show');
            }
        }
    });
	$('body').on('click','.dropdown-toggle',function(e){
        e.preventDefault();
    });
	$('body').on('click','label',function(e){
        e.preventDefault();
        if($(e.target).hasClass('form-control') || $(e.target).closest('[nofocus]').length){
        }else{
            if(!$(this)[0].hasAttribute('nofocus')){
                if($(e.target).closest('.custom-control').find('.custom-control-input').length){
                    $(e.target).closest('.custom-control').find('.custom-control-input').click();
                }else if($(e.target).parent().find('input,textarea,select').length){
                    $(e.target).parent().find('input,textarea,select').focus();
                }
            }
		}
    });
	
    // form validation function start
    $('body').on('click submit','form',function(e){
        if((e.target.nodeName.toLowerCase()==='button' && $(e.target).attr('type')!='button') || e.type=='submit'){
            var x=0;
            $(this).find("[name]").each(function(){
                var tar=$(this);
                if(!field_validate(tar)){
                    tar.addClass('ng-checked');
                    error_handler(tar,{keyCode:0});
                    x++;
                }
            });
            if(x>0){
                e.preventDefault();
                $(this).find('.is-invalid:first-child').focus();
            }
        }
    });
    $('body').on('blur keypress input change paste','[name]',function(e){
        var thus=e.target;
        var check=true;
        if(['keypress','paste'].indexOf(e.type)>-1){
            let key=e.charCode || e.keyCode;
            //  + String.fromCharCode(key);
            var prev_val=$(thus).val();
            var type=$(thus).attr('type');
            setTimeout(() => {
                var val=$(thus).val();
                if((field_validate($(thus),val,false,true)==false) || (type=='email' && e.keyCode==32)){
                    e.preventDefault();
                    $(thus).val(prev_val);
                    if(field_validate($(thus),prev_val,false)){
                        error_handler($(thus),false);
                    }
                }
            });
        }else if(e.type=='focusout' || e.type=='blur'){
            $(thus).addClass('ng-checked');
        }else if(e.type=='input'){
            if($(thus).attr('data-transform')=='uppercase'){
                $(thus).val($(thus).val().toUpperCase());
            }
        }else if(e.type=='change'){
            if(['checkbox','radio'].indexOf($(thus).attr('type'))>-1 && typeof $(thus).attr('data-required')!=='undefined'){
                let len=isNaN($(thus).attr('data-required'))?1:parseInt($(thus).attr('data-required'));
                $(thus).closest('form').find('[name="'+$(thus).attr('name')+'"]').each(function(){
                    error_handler($(this),($(thus).closest('form').find('[name="'+$(thus).attr('name')+'"]:checked').length<len?{keyCode:0}:false));
                });
            }
        }else if(!$(thus).hasClass('ng-checked')){
            check=false;
        }
        if(check===true && ['blur','focusout','input'].indexOf(e.type)>-1){
            var type=$(thus).attr('type');
            handleError($(thus),0,e,type);
        }
    });
    function field_validate(thus,val=false,pat=true,keypress=false){
        if(val===false){
            val=thus.val();
        }
        val=typeof val==='undefined'?'':val;
        val=thus[0].hasAttribute('data-mask')?val.replace(/_/g,''):val;
        var type=thus.attr('type');
        var ret=true;
        if(type=='file'){
            var accept=thus.attr('accept');
            if(typeof accept!=='undefined' && accept.length>0){
                pat='('+accept.replace(/,/g,'|')+')$';
                if(!new RegExp(pat).test(val)){
                    ret=false;
                }
            }
        }else{
            var pattern=thus.attr('pattern');
            var max=thus.attr('max');
            var min=thus.attr('min');
            var min_len=thus.attr('minlength');
            var tar_elem=thus.attr('data-target');
            if(typeof pattern!=='undefined'){
                let pat_exp=pattern.split('}');
                let len=0;
                for(var i=0;i<pat_exp.length;i++){
                    if(pat_exp[i].length<1){ continue; }
                    pat='^('+pat_exp[i]+'})$';
                    var mat=pat.match('{[0-9]{0,},{0,1}[0-9]{0,}}');
                    var len_end=val.length-1;
                    let j1=1;
                    if(mat){
                        mat=mat[0].substr(1,mat[0].length-2).split(',');
                        len_end=parseInt(mat[0].length<1?0:mat[0]);
                        mat[2]=parseInt(typeof mat[1]!=='undefined'?(mat[1].length>0?mat[1]:1):len_end);
                        j1=(len_end>mat[2]?len_end:mat[2])+1;
                    }
                    for(let j=1;j<j1;j++){
                        const j2=(i+2==pat_exp.length?val.length:j);
                        const j3=typeof mat[1]==='undefined' && j2>mat[0]?mat[0]:(j2>mat[1]?mat[1]:j2);
                        pat=pat.replace(/{\d{0,}}/g,'{0,}').replace(/{\d{0,},\d{0,}}/g,'{0,'+j3+'}');
                        if(val.length<len+j){
                            break;
                        }
                        if(!new RegExp(pat).test(val.substr(len,j2))){
                            if(j==0 || i+2==pat_exp.length || typeof mat[1]==='undefined'){
                                ret=false;
                            }
                            break;
                        }
                        len_end=j3;
                    }
                    if(mat){
                        len+=len_end;
                        if(len>=val.length){
                            break;
                        }
                    }
                }
            }
            if(typeof max!=='undefined'){
                if(parseInt(val)>parseInt(max)){
                    ret=false;
                }
            }
            if(typeof min!=='undefined'){
                if(parseInt(val)<parseInt(min)){
                    ret=false;
                }
            }
            if(keypress===false){
                if(typeof pattern!=='undefined' && val.length>0){
                    if(!new RegExp('^('+pattern+')$').test(val)){
                        ret=false;
                    }
                }
                if(typeof tar_elem!=='undefined'){
                    if(val!=$('[name="'+tar_elem+'"]').val()){
                        ret=false;
                    }
                }
                if(typeof min_len!=='undefined'){
                    if(val.length<min_len && val.length>0){
                        ret=false;
                    }
                }
                if(val.length<1 && typeof thus.attr('required')!=='undefined'){
                    ret=false;
                }
                if(type && type.toLowerCase()=='email' && !email_filter.test(val)){
                    ret=false;
                }
            }
            if(['checkbox','radio'].indexOf($(thus).attr('type'))>-1 && typeof thus.attr('data-required')!=='undefined'){
                let len=isNaN($(thus).attr('data-required'))?1:parseInt($(thus).attr('data-required'));
                ret=thus.closest('form').find('[name="'+thus.attr('name')+'"]:checked').length>=len;
            }
        }
        return ret;
    }
    function handleError(thus,length=0,e,type){
        type=typeof type==='undefined' || type!='email'?'':type;
        var val=thus.val();
        if(((val.length>length && type=='') || (type.toLowerCase()=='email' && email_filter.test(val)) || val.length<1) && field_validate(thus)){
            error_handler(thus,false);
        }else{
            error_handler(thus,e);
        }
    }
    function error_handler(thus,err){
        var tar=thus.parent().find('.error');
        if(tar.length<1){
            tar=thus.closest('.form-group').find('.error');
        }
        if($(thus).hasClass('ng-checked')){
            if(err===false){
                tar.addClass('d-none');
                thus.removeClass('is-invalid').removeClass('state-invalid');
            }else if(typeof err!=='undefined'){
                var msg=tar.attr('data-errors');
                let msg1=typeof thus.attr('required')!=='undefined' && thus.val().length<1?"This field is required":"Please enter a valid value.";
                if(typeof msg==='undefined'){
                    msg=msg1;
                }else{
                    msg=msg.split(',');
                    msg=msg.length>1?(thus.val().length>0?msg[1]:msg[0]):msg[0];
                    msg=msg.length>1?msg:msg1;
                }
                tar.html(msg);
                let key=err.charCode || err.keyCode;
                if(key!=9){
                    tar.removeClass('d-none');
                    thus.addClass('is-invalid state-invalid');
                }
            }
        }
    }
    // form validation function end
});