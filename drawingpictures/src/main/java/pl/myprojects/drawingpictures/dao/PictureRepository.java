package pl.myprojects.drawingpictures.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pl.myprojects.drawingpictures.model.Picture;

@Repository
public interface PictureRepository extends CrudRepository<Picture,Long>{

	public List<Picture> findAll();
	
	public void delete(Picture pic);
	
	@SuppressWarnings("unchecked")
	public Picture save(Picture pic);
	
	@Query("SELECT COUNT(p.id) FROM Picture p")
	public int countNumberOfRows();
	
	@Query("SELECT p FROM Picture p WHERE p.id > :from AND p.id <= :to ORDER BY p.id DESC")
	public List<Picture> findPicturesInRange(@Param("from") Long from, @Param("to") Long to);
	
	@Query("SELECT p FROM Picture p WHERE p.id > :from AND p.id <= :to AND p.author = :select ORDER BY p.id DESC")
	public List<Picture> findPicturesInRange(@Param("from") Long from, @Param("to") Long to, @Param("select") String select);
	
	@Query("SELECT DISTINCT p.author FROM Picture p ORDER BY p.author DESC")
	public List<String> findAllAuthors();
}
