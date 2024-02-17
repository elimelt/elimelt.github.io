import './CollectionViewDefaults.css'

/* collection: [
 *  itemName, ...
 * ]
 * classNames: {
 *  div: 'class-name',
 *  button: 'class-name',
 *  span: 'class-name'
 * }
 * clickHandlers: [
 *   function() {...}, ...
 * ]
 *
 * */
const CollectionView = ({
  collection,
  classNames,
  clickHandler,
  BackButton
}) => {
  return (
    <>
      {BackButton && <BackButton />}
      {collection.map((item, idx) => (
        <div
          key={idx}
          className={
            classNames.hasOwnProperty('div') ? classNames.div : 'item-container'
          }
        >
          <button
            onClick={() => clickHandler(item)}
            className={
              classNames.hasOwnProperty('button')
                ? classNames.button
                : 'item-button'
            }
          >
            <span
              className={
                classNames.hasOwnProperty('span')
                  ? classNames.span
                  : 'item-name'
              }
            >
              {item}
            </span>
          </button>
        </div>
      ))}
    </>
  )
}

export default CollectionView
