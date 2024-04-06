let annot_space = document.getElementById('mainImage');
let annotate_list = document.getElementById('image-annotations')
let image_annotations_list = document.getElementById('image1-annotations-table')
let dropdown_btn = document.getElementById('mtds-tool-btn')
let tableRows = document.querySelectorAll('.table-annotations tr');

let modal_reminder = document.getElementById('modal-reminder')


let mtds = document.getElementById('mtds')
let dynein = document.getElementById('dynein')
let confLevelCell = document.querySelector('.conf-level');


let selector_class = "disarranged"
let selector_class_full_name = "Disarranged"
let selected_annotation = null;

let selected_image = null;

let count = 0


const annot_cycle = [
  'unknown',
  'outer',
  'inner',
  'both',
  'none'
]

const annot_tools = [
  'disarranged',
  'extra-tuble',
  'single-tuble',
  'transposition',
  'one-central-pair-missing',
  'both-missing',
  'compound',
  'other'
]

const annot_map = {
  'Disarranged': 'disarranged',
  'Extra tubule': 'extra-tuble',
  'Single tubule': 'single-tuble',
  'Transposition': 'transposition',
  'One of central pair missing': 'one-central-pair-missing',
  'Both missing': 'both-missing',
  'Compound': 'compound',
  'Other defects': 'other'
}

let annotation_list = []


const update_rightside = (row) => {
  let icon = row.cells[0].children[0]
  var defectType = row.cells[1].textContent.trim();
  var confLevel = row.cells[2].querySelector('.chip')?.textContent.trim();

  mtds.onchange = undefined
  confLevelCell.onchange = undefined

  mtds.value = defectType;
  confLevelCell.textContent = confLevel || '--%';
  dynein.value = `${annot_cycle.indexOf(icon.className.split(' ').reverse()[0])}`
  calc_chips();

  mtds.onchange = (event) => {
    ('changed')
    row.cells[1].textContent = mtds.value;
    let icons = document.querySelectorAll(`[id="${icon.id}"]`)
    disable_automatic(icon.id)
    for (let i of icons){
      let keep = i.className.split(' ');
      keep.splice(2,1,annot_map[mtds.value]);
      i.className = keep.join(' ');

    }
    if (confLevelCell.firstChild != null)
      confLevelCell.textContent = '--%'
    calc_chips();
  }

  dynein.onchange = (event) => {
    let icons = document.querySelectorAll(`[id="${icon.id}"]`)
    disable_automatic(icon.id)
    for (let i of icons){
      let keep = i.className.split(' ');
      keep.splice(3,1,annot_cycle[dynein.value]);
      console.log(keep)
      i.className = keep.join(' ');
    }
    if (confLevelCell.firstChild != null)
      confLevelCell.textContent = '--%'

    calc_chips();
  }
}


const row_click_callback = (row) => {return (event) => {

  // Extract information from the clicked row
  var icon = row.cells[0].children[0].id
  annotate_list.querySelector(`#${icon}`).click();
}
}


// Add click event listeners to each row
tableRows.forEach(function(row) {
  row.addEventListener('click', row_click_callback(row));
});




const set_tool = (tool,ll) => {
  let name = ll.children[1].innerHTML;
  selector_class = tool;
  selector_class_full_name = ll.querySelectorAll('span')[0].innerHTML;
  let child = dropdown_btn.children[0];
  let all = child.className.split(' ');
  let keep = all.slice(0, all.length-1);
  child.className = keep.join(' ') + ' ' + selector_class;
  child = dropdown_btn.children[1];
  child.innerHTML = name;

  child = dropdown_btn.children[2];
  children = child.children;
  for (let c of children){
    c.classList.remove('active');
  }

  ll.classList.add('active');

}

const select_annotation = (annot) => {
  let selected = document.querySelectorAll('.annotation.selected');
  for (let s of selected){
    s.classList.remove('selected');
  }
  annot.className = 'selected '+ annot.className;
  selected_annotation = annot;
  let rows = document.querySelectorAll('.table-annotations tr.selected-row');
  for (let r of rows){
    r.classList.remove('selected-row');
  }
  let i = annot.id.split('-')[2];
  console.log(i)  
  image_list = document.getElementById(`${i}-annotations-table`)
  let annot_row = image_list.querySelector('[id="'+annot.id+'"]');
  annot_row.parentElement.parentElement.classList.add('selected-row');

  update_rightside(annot_row.parentElement.parentElement)
}


const create_annotation = (x,y) => {
  return {
    id: Math.floor(Math.random() * 1000),
    x: x,
    y: y,
    class: selector_class,
    cycle: 0,
    confidence: Math.round(Math.random()*30 + 70)
  }
}

let create_annot_row = (annot_class, id, confidence, auto=false) => {
  let row = document.createElement('tr');
  let cell_icon = document.createElement('td');
  let cell_text = document.createElement('td');
  let cell_delete = document.createElement('td');
  let cell_conf = document.createElement('td');
  let annot = document.createElement('div');
  let conf = document.createElement('div');

  row.onclick = row_click_callback(row);

  annot.className = 'table ' + annot_class;
  annot.id = id;

  cell_icon.appendChild(annot);
  row.appendChild(cell_icon);

  conf.innerHTML = ``;
  cell_text.innerHTML = selector_class_full_name;
  if(auto){
    conf.innerHTML = `${confidence}%`;
    conf.className = 'chip';
    const s_c = annot_class.split(' ').reverse()[1];
    const s_c_n = Object.keys(annot_map).find(key => annot_map[key] === s_c);
    cell_text.innerHTML = s_c_n;
  }
  row.appendChild(cell_text);
  cell_conf.appendChild(conf);
  row.appendChild(cell_conf);

  
  cell_delete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  cell_delete.onclick = (event) => {
    delete_annot(id);
  }
  row.appendChild(cell_delete);


  return row;

}

let update_row = (id) => {
  let annot = document.querySelectorAll('[id="'+id+'"]');
  for (let a of annot){
    let row = a.parentElement.parentElement;
    if (row.tagName == 'TR'){
      row.cells[2].children[0].innerHTML = '';
    }
  }

}

const open_loading = () => {
  let loading = document.getElementById('modal-loading');
  loading.style.display = 'block';
}

const close_loading = () => {
  let loading = document.getElementById('modal-loading');
  loading.style.display = 'none';
}

const create_annot = (x_page,y_page, auto=false) => {
  let x = x_page-7;
  let y = y_page-7;
  let annot = document.createElement('div');
  let annot_obj = create_annotation(x,y);
  annotation_list.push(annot_obj);
  let s_c = selector_class;
  let a_c = annot_cycle[0]; 
  if (auto){
    s_c = annot_tools[Math.floor(Math.random()*annot_tools.length)]
    a_c = annot_cycle[Math.floor(Math.random()*annot_cycle.length)]
  }
  let image = document.getElementById('mainImage').alt;
  selected_image = image

  let id = 'annot-'+ Math.floor(Math.random() * 1000)+'-'+image;
  annot.className = 'annotation '
  if (auto)
    annot.className += 'automatic '
  annot.className +=  s_c +' ' + a_c;
  annot.id = id;
  annot.style.left = x + 'px';
  annot.style.top = y + 'px';
  annot_row = create_annot_row(annot.className,id,annot_obj.confidence, auto);
  image_list = document.getElementById(`${selected_image}-annotations-table`)
  let insert_index = Array.prototype.findIndex.call(image_list.children,(row) => {
    return parseFloat(row.cells[2].textContent.trim().replace('%','')) > annot_obj.confidence;
  })
  insert_index = insert_index == -1 ? image_list.children.length : insert_index;
  image_list.insertBefore(annot_row, image_list.children[insert_index]);
  if (!auto){
    select_annotation(annot)
  }
  annot.oncontextmenu = (event) =>{
    event.preventDefault()
    delete_annot(id)
  }
  annot.onclick = (event) => {
    if (selected_annotation?.id != id){
      select_annotation(annot)
      return
    }
    annotations = document.querySelectorAll('[id="'+id+'"]')
    disable_automatic(id)
    let old_annot = annotations[0].className.split(' ').reverse()[0];
    let new_annot = annot_cycle[(annot_cycle.indexOf(old_annot)+1)%5];
    for (let a of annotations){
      let old_annot = a.className.split(' ');
      let keep = old_annot.slice(0, old_annot.length-1);
      a.className = keep.join(' ') + ' ' + new_annot;
    }

    update_rightside(annot_row)
    
  }
  annotate_list.appendChild(annot);
  calc_chips();
}

annot_space.onclick = (event) => {
  count+=1;
  create_annot(event.pageX,event.pageY)
  console.log(count)
  if((count+1) % 6  ==0){
    console.log('adsadsa')
    modal_reminder.classList.add('show')
    setTimeout(()=>{
      modal_reminder.classList.remove('show')
    },5000)
  }
}


const delete_annot = (annot_id) => {
  annotate_list.removeChild(annotate_list.querySelector(`#${annot_id}`))
  image_list = document.getElementById(`${selected_image}-annotations-table`)
  image_list.removeChild(image_list.querySelector((`#${annot_id}`)).parentElement.parentElement)
}


let run_annotation = false;
const simulate_click = () => {
  run_annotation = true;
  if (document.querySelectorAll('.seen').length == 0) {
    console.error('No annotations to simulate')
    return
  }

  open_loading();

  setTimeout(() => {
    let rect = annot_space.getBoundingClientRect();
    let start_x = rect.left
    let start_y = rect.top

    let end_x = rect.right
    let end_y = rect.bottom

    let x_size = end_x  - start_x - 100;
    let y_size = end_y - start_y - 100;

    for (let i = 0; i < 20; i++){
      x_rand = Math.floor(Math.random()*x_size + 50)
      y_rand = Math.floor(Math.random()*y_size + 50)
      x = start_x + x_rand
      y = start_y + y_rand
      create_annot(x,y,true)
    }
    close_loading();
  },1)

  document.getElementById("warning-modal").style.display = "block";
}


const delete_automatic = () => {
  let annots = document.querySelectorAll('.annotation.automatic');
  (annots)
  for (let a of annots){
    delete_annot(a.id)
  }
}

const disable_automatic = (id) => {
  annotations = document.querySelectorAll('[id="'+id+'"]')
  for (let a of annotations){
    let classes = a.className.split(' ');
    let automatic = classes.indexOf('automatic');
    if (automatic != -1){
      classes.splice(automatic,1);
    }
    a.className = classes.join(' ');  
  }

  update_row(id)
}


opacity_range = document.getElementById('myRange');

opacity_range.oninput = () => {
  console.log('chaninig')

  let annots = annotate_list.querySelectorAll('.annotation');
  for (let a of annots){
    a.style.opacity = opacity_range.value/100;
  }
}