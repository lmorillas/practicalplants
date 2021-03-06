<?php
/**
 * This script imports images from WikiSpecies
 *
 * Usage:
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * http://www.gnu.org/copyleft/gpl.html
 *
 * @ingroup Maintenance
 */

require_once( dirname(dirname( __FILE__ )) . '/Maintenance.php' );

class AddPrimaryImages extends Maintenance {
	public function __construct() {
		parent::__construct();
		$this->mDescription = "Get primary image from Wikispecies.";
		$this->addOption( 'from', 'What item to start from', false, true );
		$this->addOption( 'title', 'A single title to grab', false, true );
		//$this->addOption( 'type', 'Type of job to run', false, true );
		//$this->addOption( 'procs', 'Number of processes to use', false, true );
	}

	public function memoryLimit() {
		// Don't eat all memory on the machine if we get a bad job.
		return "150M";
	}

	public function execute() {
		global $wgTitle;
		$res = $this->queryPages();
		if(!$res || count($res) === 0){
			$this->log('No results');
		}else{
			$this->log(count($res).' results found');
		}
		if ( $this->hasOption( 'from' ) ) {
			$from = trim( $this->getOption( 'from' ) );
			$skip = true;
		}
				
		//echo $from; exit;
		//$this->log(print_r($res,true));
		foreach ( $res as $row ) {
			if(isset($from)){
				if(trim($row->page_title) == $from)
					$skip = false;
				if($skip){
					$this->log( 'Skipping '.$row->page_title);
					continue;
				}
			}
			$title = Title::newFromText( $row->page_title );
			$article = new Article( $title, 0 );
			
			if ( !$article ) {
				$this->log( 'Page title not found: '.$row->page_title );
				return false;
			}
			$content = $article->fetchContent();
			
			if(preg_match('%{{(Plant|Cultivar|Cultivar group|Variety|Subspecies)%ui',$content, $m)){
				$has_tpl = preg_match('%{{Article state%ui', $content, $matched);
				if(!$has_tpl){
					$this->log($title->getText());
					$this->log('Adding article state template');
					
					$content .= "{{Article state
|article cleanup=Yes
|article incomplete=Yes
|article citations=No
}}";
					
					$edit_summary = 'Adding article state template.';
					
					$article->doEdit( $content, $edit_summary, EDIT_MINOR );
											
				}else{
					$this->log($row->page_title.' already has article state template. Skipping.');
				}
				
			}
		}		
		
	}
	
	public function queryPages(){
		$dbr = wfGetDB( DB_SLAVE );
		$tables = array( 'page','categorylinks' );
		$vars = array( 'page_id', 'page_namespace', 'page_title' );
		
		$category = Title::newFromText( 'Plant' )->getDbKey();
				
		$conds = array(
			//'page_namespace' => $namespaces,
			'page_id = cl_from',
			'cl_to' => $category
		);
		
		if ( $this->hasOption( 'title' ) ) {
			$title = trim( $this->getOption( 'title' ) );
			$conds['page_title'] = $title;
		}
		
		$sort = array( 'ORDER BY' => 'page_title' );

		return $dbr->select( $tables, $vars, $conds, __METHOD__ , $sort );
	}

	/**
	 * Log the job message
	 * @param $msg String The message to log
	 */
	private function log( $msg ) {
		$this->output( " $msg\n" );
		wfDebugLog( 'AddPrimaryImages', $msg );
	}
}

$maintClass = "AddPrimaryImages";
require_once( RUN_MAINTENANCE_IF_MAIN );
