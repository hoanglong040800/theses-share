import { Box } from '@material-ui/core'
import Link from 'next/link'
import NavLinkMenu from './NavLinkMenu'
import { navlinks } from 'common/utils/constants'

export default function NavLink() {
  return (
    <>
      {
        //
        navlinks.map(item => (
          <NavLinkMenu key={item.cate} name={item.cate} lists={item.lists} />
        ))
      }

      <Box ml={0.5}>
        <Link href="/about">
          <a>
            <h3>Về Theses Share</h3>
          </a>
        </Link>
      </Box>
    </>
  )
}
