let annot_space = document.getElementById('mainImage');
let annotate_list = document.getElementById('image-annotations')
let image_annotations_list = document.getElementById('image1-annotations-table')
let dropdown_btn = document.getElementById('mtds-tool-btn')

let selector_class = "dissaranged"

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

let annotation_list = []


const set_tool = (tool,ll) => {
  let name = ll.children[1].innerHTML;
  selector_class = tool;
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


create_annotation = (x,y) => {
  return {
    id: Math.floor(Math.random() * 1000),
    x: x,
    y: y,
    class: selector_class,
    cycle: 0
  }
}

let create_annot_row = (annot_class, id) => {
  let row = document.createElement('tr');
  let cell_icon = document.createElement('td');
  let cell_text = document.createElement('td');
  let cell_conf = document.createElement('td');
  let annot = document.createElement('div');
  let conf = document.createElement('div');


  annot.className = 'table ' + annot_class;
  annot.id = id;
  cell_icon.appendChild(annot);
  row.appendChild(cell_icon);
  cell_text.innerHTML = "AHOJ";
  row.appendChild(cell_text);
  conf.innerHTML = "0.9";
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
  image_annotations_list.appendChild(create_annot_row(annot.className,id));
  annot.onclick = () => {
    annotations = document.querySelectorAll('[id="'+id+'"]')
    let new_annot = annot_cycle[(annot_cycle.indexOf(annot.className.split(' ').reverse()[0])+1)%5];
    console.log(new_annot);
    for (let a of annotations){
      let old_annot = a.className.split(' ');
      let keep = old_annot.slice(0, old_annot.length-1);
      console.log(keep, new_annot);
      a.className = keep.join(' ') + ' ' + new_annot;
    }
    
  }
  annotate_list.appendChild(annot);
}
