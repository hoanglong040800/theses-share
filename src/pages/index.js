import { Box, makeStyles } from '@material-ui/core'
import { colDef } from 'common/utils/constants'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Link from 'next/link'

const data = [
  {
    id: 1,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    publishedYear: 2021,
    tags: ['học sâu', 'mạng neural', 'học sâu', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 2,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    publishedYear: 2020,
    tags: ['máy học', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 3,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    publishedYear: 2021,
    tags: ['học sâu', 'mạng neural', 'học sâu', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 4,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    publishedYear: 2020,
    tags: ['máy học', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 5,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    publishedYear: 2021,
    tags: ['học sâu', 'mạng neural', 'học sâu', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 6,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    publishedYear: 2020,
    tags: ['máy học', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 7,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    publishedYear: 2021,
    tags: ['học sâu', 'mạng neural', 'học sâu', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 8,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    publishedYear: 2020,
    tags: ['máy học', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 9,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    publishedYear: 2021,
    tags: ['học sâu', 'mạng neural', 'học sâu', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 10,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    publishedYear: 2020,
    tags: ['máy học', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },
]

export default function Home() {
  const mui = useStyles()
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <Box my={8}>
        <Link href="/theses/newest">
          <a>
            <h1 className={mui.link}>Luận văn mới nhất</h1>
          </a>
        </Link>

        <Box mt={3}>
          <ThesesTable columns={colDef} rows={data} />
        </Box>
      </Box>

      <Box my={8}>
        <Link href="/theses/most-views">
          <a>
            <h1 className={mui.link}>Luận văn xem nhiều</h1>
          </a>
        </Link>

        <Box my={3}>
          <ThesesTable columns={colDef} rows={data} />
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles({
  link: {
    display: 'inline',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
