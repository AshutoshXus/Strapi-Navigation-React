import { useRef } from 'react'
import { useGlobalContext } from './Context'
import sublinks from './data'

const Submenu = () => {
  const { pageId, setPageid } = useGlobalContext()
  const currentPage = sublinks.find((item) => item.pageId === pageId)
  const submenuConatiner = useRef(null)

  const handleMouseLeave = (e) => {
    const submenu = submenuConatiner.current
    const { left, right, bottom } = submenu.getBoundingClientRect()
    const { clientX, clientY } = e

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageid(null)
    }
  }

  return (
    <div
      className={currentPage ? 'submenu show-submenu' : 'submenu'}
      onMouseLeave={handleMouseLeave}
      ref={submenuConatiner}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          gridTemplateColumns:
            currentPage?.links?.length > 3 ? '1fr 1fr' : '1fr',
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link
          return (
            <a key={id} href={url}>
              {icon}
              {label}
            </a>
          )
        })}
      </div>
    </div>
  )
}
export default Submenu
