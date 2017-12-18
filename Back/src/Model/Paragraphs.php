<?php
/**
 * Created by PhpStorm.
 * User: maxime
 * Date: 27/11/17
 * Time: 19:38
 */

/**
 * Class Paragraphs
 *      Model that handle request to the database on paragraphs objects
 */
class Paragraphs {

    private function __construct() {}

    const ID = "ID";
    const CONTENT = "CONTENT";
    const POSITION = "POSITION";
    const IDARTICLE = "ARTICLE_ID";

    /**
     * Get the list of all paragraphs
     * @return array
     *      List of paragraphs ID => CONTENT
     */
    public static function queryParagraphs(): array {
        return DBAccess::getInstance()->queryAll("SELECT * FROM PARAGRAPHES");
    }

    /**
     * Get a paragraph by his ID
     * @param int $id
     *      The id of the paragraph
     * @return array
     *      array of paragraphs
     */
    public static function queryParagraphById(int $id): array {
        if (empty($id)) {
            return array();
        }
        return DBAccess::getInstance()->queryOne("SELECT * FROM PARAGRAPHES WHERE ".Paragraphs::ID."=?", [$id]);
    }

    /**
     * Get all paragraphs associated the an article by the article ID
     * @param int $articleId
     *      The id of the article
     * @return array
     *      All paragraph of the article, empty array if an error occurred
     */
    public static function queryParagraphsByArticleId(int $articleId): array {
        if (empty($articleId)) {
            return array();
        }
        return DBAccess::getInstance()->queryAll("SELECT * FROM PARAGRAPHES WHERE ".Paragraphs::IDARTICLE."=?", [$articleId]);
    }

    /**
     * Get a paragraph by his position in an article
     * @param int $articleId
     *      The if of the article associated to the paragraph
     * @param int $position
     *      The position of the paragraph in the article
     * @return array
     */
    public static function queryParagraphByArticleIdAndPosition(int $articleId, int $position): array {
        if (empty($articleId) || empty($position)) {
            return array();
        }
        return DBAccess::getInstance()->queryOne(
            "SELECT * FROM PARAGRAPHES WHERE ".Paragraphs::IDARTICLE."=? AND  ".Paragraphs::POSITION."=?",
            [$articleId, $position]);
    }

    /**
     * Update the content of a paragraph by his ID
     * @param int $idPara
     *      The id of the paragraph to update
     * @param string $newContent
     *      The new content of the paragraph
     * @param int $newPos
     *      The position of the new paragraph
     * @param int $idArticle
     *      The id of the article associated to the paragraph
     * @return array
     *      Updated paragraph
     */
    public static function queryUpdateParagraphWithId(int $idPara, string $newContent, int $newPos, int $idArticle) {
        if (empty($idPara)) {
            return null;
        }
        $params = array();
        $sql = "UPDATE PARAGRAPHES SET";
        if($newContent!=='') {
            $sql = $sql." ".Paragraphs::CONTENT."=? , ";
            $params[] = $newContent;
        }
        if($newPos!==-1) {
            $sql = $sql . " ".Paragraphs::POSITION."=? , ";
            $params[] = $newPos;
            self::updatePositionParagraphsOnUpdate($idPara, $newPos);
        }
        if($idArticle!==-1) {
            $sql = $sql . " ".Paragraphs::IDARTICLE."=? , ";
            $params[] = $idArticle;
        }
        $sql = substr($sql,0,strlen($sql)-2);
        $sql = $sql . "WHERE ".Paragraphs::ID . "=?";
        $params[] = $idPara;
        DBAccess::getInstance()->queryUpdate($sql, $params);
        return self::queryParagraphById($idPara);
    }

    /**
     * @param int $idPara
     * @param string $newContent
     * @param int $newPos
     * @param int $idArticle
     * @return int|null
     */
    //TODO Virer la fonction?
    public static function queryUpdateFullParagraphWithId(int $idPara, string $newContent, int $newPos, int $idArticle){
        $sql = "UPDATE PARAGRAPHES SET ".self::CONTENT."=? AND ".self::POSITION."=? AND ".self::IDARTICLE."=? WHERE ID=?";
        $params = [$newContent, $newPos, $idArticle, $idPara];
        return DBAccess::getInstance()->queryUpdate($sql,$params);
    }

    /**
     * Get the position of the last paragraph in the article
     * @param int $idArticle
     *      The id of the article
     * @return array
     *      Array that containing the position, or empty array if no paragraphs
     */
    public static function getCurrentMaxPositionOfArticle(int $idArticle){
        return DBAccess::getInstance()->queryOne(
            "SELECT POSITION FROM PARAGRAPHES WHERE " . Paragraphs::IDARTICLE . " = ? ORDER BY "
            . Paragraphs::POSITION . " DESC LIMIT 1", [$idArticle]);
    }

    /**
     * Insert a new paragraph at a position
     * @param int $idArticle
     *      The id of the article
     * @param string $newContent
     *      The content of the new paragraph
     * @param int|null $position
     *      The position where the paragraph must be inserted
     * @return array
     *      Array of the new paragraph if insertion succeed, empty array if failed
     */
    public static function insertParagraphInArticle(int $idArticle, string $newContent, int $position): array {
        if ($position===0) {
            $position = ceil(self::getCurrentMaxPositionOfArticle($idArticle)[self::POSITION]);
            empty($position) ?
                $position = 1 :
                $position += 1;
        } else {
            self::updatePositionParagraphsOnInsert($position, $idArticle);
        }

        if (DBAccess::getInstance()->queryInsert(
            "INSERT INTO PARAGRAPHES (CONTENT, POSITION, ARTICLE_ID) VALUES (?,?,?) ",
            [$newContent, $position, $idArticle])) {
            return Paragraphs::queryParagraphById(DBAccess::getInstance()->getLastInserted());
        }
        return array();
    }

    /**
     * Delete a paragraph by his id
     * @param int $id
     *      The id of the paragraph to delete
     * @return bool
     *      Bool confirming the deletion, or note
     */
    public static function queryDeleteParagraphById(int $id){
        $sql = "DELETE FROM PARAGRAPHES WHERE ".self::ID."=?";
        return DBAccess::getInstance()->queryDelete($sql, [$id]);
    }


    /**
     * This function will update all position of other paragraphs when an update of position occurred
     * @param $idPara
     *      The id of the current paragraph
     * @param $newPosition
     *      The new position of the article
     */
    public static function updatePositionParagraphsOnUpdate($idPara, $newPosition) {
        $para = self::queryParagraphById($idPara);
        $idArticle = $para[self::IDARTICLE];
        $currentPos = $para[self::POSITION];
        echo "new : ".$newPosition;
        echo "old : ".$currentPos;
        echo "art : ".$idArticle;
        if ($newPosition == 0 || $idPara == 0) {
            return;
        }
        if ($newPosition > $currentPos) {
            $sql = "UPDATE PARAGRAPHES SET ".self::POSITION." = ".self::POSITION." - 1 ".
            "WHERE ".self::POSITION." <=? AND ".self::POSITION." >? AND ".self::IDARTICLE." = ?";
        } else {
            $sql = "UPDATE PARAGRAPHES SET ".self::POSITION." = ".self::POSITION." + 1 ".
            "WHERE ".self::POSITION." >=? AND ".self::POSITION." <? AND ".self::IDARTICLE." = ?";
        }
        echo $sql;
        DBAccess::getInstance()->queryUpdate($sql, [$newPosition, $currentPos, $idArticle]);
    }

    public static function updatePositionParagraphsOnInsert($newPosition, $idArticle) {
        $sql = "UPDATE PARAGRAPHES SET ".self::POSITION."=".self::POSITION." + 1 ".
            "WHERE ".self::POSITION. " >=? AND ".self::IDARTICLE." =?";
        DBAccess::getInstance()->queryUpdate($sql, [$newPosition, $idArticle]);
    }
}