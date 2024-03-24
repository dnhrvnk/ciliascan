let annot_space = document.getElementById('mainImage');
let annotate_list = document.getElementById('image-annotations')
let image_annotations_list = document.getElementById('image1-annotations-table')
let dropdown_btn = document.getElementById('mtds-tool-btn')
let tableRows = document.querySelectorAll('.table-annotations tr');


let mtds = document.getElementById('mtds')
let dynein = document.getElementById('dynein')
let confLevelCell = document.querySelector('.conf-level');


let selector_class = "dissaranged"
let selector_class_full_name = "Disarranged"
let selected_annotation = null;


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
  var confLevel = row.cells[2].querySelector('.chip').textContent.trim();

  mtds.onchange = undefined
  confLevelCell.onchange = undefined

  mtds.value = defectType;
  confLevelCell.textContent = confLevel;
  dynein.value = `${annot_cycle.indexOf(icon.className.split(' ').reverse()[0])}`
  calc_chips();

  mtds.onchange = (event) => {
    console.log('changed')
    row.cells[1].textContent = mtds.value;
    let icons = document.querySelectorAll(`[id="${icon.id}"]`)
    for (let i of icons){
      console.log(i)
      let keep = i.className.split(' ');
      keep.splice(2,1,annot_map[mtds.value]);
      console.log(keep)
      i.className = keep.join(' ');

    }
    row.cells[2].querySelector('.chip').textContent = confLevelCell.textContent = '--%'
    calc_chips();
  }

  dynein.onchange = (event) => {
    let icons = document.querySelectorAll(`[id="${icon.id}"]`)
    for (let i of icons){
      let keep = i.className.split(' ');
      keep.splice(3,1,annot_cycle[dynein.value]);
      i.className = keep.join(' ');
    }
    row.cells[2].querySelector('.chip').textContent = confLevelCell.textContent = '--%'
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
  let annot_row = image_annotations_list.querySelector('[id="'+annot.id+'"]');
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
    confidence: Math.round(Math.random()*100)
  }
}

let create_annot_row = (annot_class, id, confidence) => {
  let row = document.createElement('tr');
  let cell_icon = document.createElement('td');
  let cell_text = document.createElement('td');
  let cell_conf = document.createElement('td');
  let annot = document.createElement('div');
  let conf = document.createElement('div');

  row.onclick = row_click_callback(row);

  annot.className = 'table ' + annot_class;
  annot.id = id;
  cell_icon.appendChild(annot);
  row.appendChild(cell_icon);
  cell_text.innerHTML = selector_class_full_name;
  row.appendChild(cell_text);
  conf.innerHTML = `${confidence}%`;
  conf.className = 'chip';
  cell_conf.appendChild(conf);
  row.appendChild(cell_conf);

  return row;

}

annot_space.onclick = (event) => {

  let x = event.pageX-7;
  let y = event.pageY-7;
  let annot = document.createElement('div');
  let annot_obj = create_annotation(x,y);
  annotation_list.push(annot_obj);
  let id = 'annot-'+ Math.floor(Math.random() * 1000);
  annot.className = 'annotation ' + selector_class +' ' + annot_cycle[0];
  annot.id = id;
  annot.style.left = x + 'px';
  annot.style.top = y + 'px';
  annot_row = create_annot_row(annot.className,id,annot_obj.confidence);
  let insert_index = Array.prototype.findIndex.call(image_annotations_list.children,(row) => {
    return parseFloat(row.cells[2].textContent.trim().replace('%','')) > annot_obj.confidence;
  })
  insert_index = insert_index == -1 ? image_annotations_list.children.length : insert_index;
  console.log(insert_index)
  image_annotations_list.insertBefore(annot_row, image_annotations_list.children[insert_index]);
  select_annotation(annot)
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
    let new_annot = annot_cycle[(annot_cycle.indexOf(annot.className.split(' ').reverse()[0])+1)%5];
    for (let a of annotations){
      let old_annot = a.className.split(' ');
      let keep = old_annot.slice(0, old_annot.length-1);
      console.log(keep, new_annot);
      a.className = keep.join(' ') + ' ' + new_annot;
    }

    update_rightside(annot_row)
    
  }
  annotate_list.appendChild(annot);
  calc_chips();
}


const delete_annot = (annot_id) => {
  annotate_list.removeChild(annotate_list.querySelector(`#${annot_id}`))
  image_annotations_list.removeChild(image_annotations_list.querySelector((`#${annot_id}`)).parentElement.parentElement)
}
