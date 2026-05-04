import { useEffect } from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import NewArrivals from './components/Sections/NewArrivals'
import Category from './components/Sections/Categories/Category'
import content from './data/content.json';
import Footer from './components/Footer/Footer'
import { fetchCategories } from './api/fetchCategories';
import { useDispatch } from 'react-redux';
import { loadCategories } from './store/features/category';
import { setLoading } from './store/features/common';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(setLoading(true));

  const startTime = Date.now();

  fetchCategories()
    .then((res) => {
      dispatch(loadCategories(res));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      const elapsed = Date.now() - startTime;
      const MIN_DELAY = 900; 
      const remainingTime = Math.max(MIN_DELAY - elapsed, 0);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, remainingTime);
    });

}, [dispatch]);

  return (
    <>
      <HeroSection />
      <NewArrivals />
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections?.map((item, index) => <Category key={item?.title+index} {...item} />)}
      <Footer content={content?.footer}/>
    </>
  )
}

export default Shop