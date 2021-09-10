const prefixNavlink = '/theses?'

export const navlinks = [
  {
    cate: 'Khoa',
    lists: [
      {
        name: 'Khoa học máy tính',
        link: `${prefixNavlink}faculty=KHMT`,
      },
      {
        name: 'Công nghệ phần mềm',
        link: `${prefixNavlink}faculty=CNPM`,
      },
    ],
  },

  {
    cate: 'Tags',
    lists: [
      {
        name: 'Máy học',
        link: `${prefixNavlink}tag=ML`,
      },
      {
        name: 'Học sâu',
        link: `${prefixNavlink}tag=DL`,
      },
    ],
  },

  {
    cate: 'Năm',
    lists: [
      {
        name: '2021',
        link: `${prefixNavlink}published_year=2021`,
      },
      {
        name: '2020',
        link: `${prefixNavlink}published_year=2020`,
      },
    ],
  },
]
