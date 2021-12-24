import { atom, action } from 'nanostores'
import type { File } from './files'

export interface TextFile extends File {
  content: string
}

export const textFiles = atom<TextFile[]>([
  {
    path: 'one',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis erat at mi euismod, vel auctor augue dapibus. Fusce euismod neque a massa imperdiet varius. Morbi sed leo dictum velit congue dignissim ultrices id elit. Integer accumsan nunc sit amet nunc feugiat sollicitudin. Etiam a porta turpis. Cras porttitor aliquam lectus, vel varius purus ullamcorper et. Aliquam eu ullamcorper lacus. Sed porttitor erat quis neque pulvinar ultrices. Quisque vitae iaculis velit. Ut blandit mi a magna porttitor, at vehicula dui scelerisque. Nullam sed fringilla eros. Vestibulum sed aliquam urna.',
  },
  {
    path: 'two',
    content:
      'Sed accumsan eros turpis, ac consequat arcu mattis ut. Donec molestie bibendum diam nec eleifend. Etiam eu ex justo. Nullam rutrum placerat ipsum vitae ultrices. Aenean condimentum venenatis egestas. Quisque vestibulum ultricies arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec quis nunc semper, consequat orci id, eleifend erat. Morbi bibendum, tortor ut blandit dictum, ligula odio viverra lorem, at faucibus purus leo non enim. Donec condimentum orci vehicula, fermentum lacus eu, imperdiet purus. Nulla id ligula cursus, bibendum turpis ac, ultricies libero. In eros nisl, sodales ac pulvinar et, consequat sed odio. Maecenas sed sodales dolor, sed consectetur nisi. Nulla et risus aliquam, molestie turpis finibus, posuere nisi.',
  },
  {
    path: 'three',
    content:
      'Maecenas lorem ligula, congue non scelerisque id, vulputate vitae ante. Proin risus dui, egestas sed gravida a, accumsan et ante. Curabitur non risus ultricies, mollis ipsum in, eleifend arcu. Donec varius turpis augue, quis convallis justo mattis in. Aliquam et efficitur neque, at eleifend orci. Nulla non aliquet dui, et semper libero. Vivamus in efficitur nisl. Etiam in urna dignissim, interdum lectus et, faucibus metus.',
  },
])

export const createTextFile = action(
  textFiles,
  'create',
  (store, file: TextFile) => {
    store.set([file, ...store.get()])
  },
)

export const editTextFile = action(
  textFiles,
  'edit',
  (store, file: TextFile) => {
    store.set(store.get().map((f) => (f.path === file.path ? file : f)))
  },
)

export const deleteTextFile = action(
  textFiles,
  'delete',
  (store, path: string) => {
    store.set(store.get().filter((file) => file.path !== path))
  },
)
