import { Divider } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ChangePassword() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Hồ sơ của tôi</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Hồ sơ của tôi</h1>
        <Divider />

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
          amet iure eaque, magni possimus quas asperiores tempore doloremque
          placeat sunt eius saepe officia dignissimos labore quisquam est error
          commodi beatae ipsa mollitia animi facilis autem aut atque. Veritatis
          facilis sequi obcaecati odit! Placeat dolore distinctio tempora
          aspernatur nemo, porro recusandae alias ipsa exercitationem mollitia
          tempore ut, quam dignissimos sit nihil unde. Molestias ea dolorem
          ratione aliquam. Tenetur autem ullam dignissimos accusantium ut ab ad,
          magni recusandae saepe earum cupiditate mollitia, esse dolor itaque
          exercitationem a. Architecto vel tempora culpa quis fugit eos at,
          vitae aspernatur officia aliquid, iusto eligendi atque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolor
          porro neque quas consequuntur enim nobis, maiores perferendis sint
          minus minima dolore perspiciatis placeat tempora officia eligendi
          dignissimos molestiae laborum sapiente? Ex temporibus soluta libero
          magni, accusamus provident asperiores aspernatur cupiditate deleniti,
          iusto perspiciatis voluptatem totam earum! Praesentium facilis quam
          tenetur illum voluptate sint obcaecati quidem quo soluta, cumque
          perspiciatis recusandae neque, eveniet aspernatur accusamus enim quia?
          Reiciendis, accusamus debitis dolor necessitatibus deserunt alias
          itaque eveniet eius culpa? Accusamus sed voluptas asperiores dolores
          voluptates mollitia dignissimos explicabo minima, ea repellat culpa
          nulla vel dicta quidem velit eos? Rem, voluptate repellat!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia enim
          deserunt quasi rem placeat beatae odit quibusdam veniam impedit
          blanditiis modi hic ut aspernatur officia quas commodi, non fugit amet
          velit iste consequatur ipsam porro. Architecto ipsum molestias
          accusantium velit aut cupiditate maxime ad consequatur, atque sunt
          distinctio optio quibusdam! A numquam assumenda, voluptas voluptatem
          eveniet vel reiciendis sequi est dolorem at omnis error nam ipsum
          dolores? Iste tenetur magnam libero tempore consequuntur nobis magni
          adipisci minima, pariatur ad, vel, repellat expedita eum placeat non
          nihil. Itaque laudantium ab recusandae ipsam, exercitationem ad eum
          aspernatur odit, aut odio beatae ratione?
        </p>
      </SettingsTabs>
    </>
  )
}
